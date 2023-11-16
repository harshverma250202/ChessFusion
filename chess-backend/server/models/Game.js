
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";



const GameSchema = new mongoose.Schema(
    {
        WhitePlayer: String,
        BlackPlayer: String,
        BlackPlayerId: String,
        WhitePlayerId: String,
        game: String,
        LastPlayed: {
            type:String,
            // only black or white  
            enum: ['white', 'black',],
        }
        
    },
    {
        timestamps: true,
    }
);

GameSchema.statics.createGame = async function (
    initiator, game
) {
    try {
       const newGame = new this({
            WhitePlayer: initiator,
            WhitePlayerId: uuidv4(),
            game: game,
            LastPlayed: 'black'
        });
        const savedGame = await newGame.save();
        console.log("game created", savedGame)
        return savedGame;
    } catch (error) {
        console.log('error on create game method', error);
        throw error;
    }
}

GameSchema.statics.getGameById = async function (id) {
    try {
        const game = await this.findOne({ _id: id });
        if (!game) throw ({ error: 'No game with this id found' });
        return game;
    } catch (error) {
        throw error;
    }
}
GameSchema.statics.updateGameById = async function (id, game) {
    try {
        console.log("recieved update req", game);
        const obj = await this.findOneAndUpdate({_id: id}, {game: game,LastPlayed: game.LastPlayed==='white'?'black':'white'},{new:true});
        return obj;
    } catch (error) {
        throw error;
    }
}
GameSchema.statics.joinGame = async function (id, player) {
    try{
        console.log("joined in schema fundtion", player);
        const obj = await this.findOneAndUpdate({_id: id}, {BlackPlayer: player, BlackPlayerId: uuidv4()},{new:true});
        return obj;
    }
    catch(error){
        throw error;
    }
}




export default mongoose.model("Game", GameSchema);