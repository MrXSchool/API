
const Model = require("./model")




const test = async () => {
    try {

        // const player = await Model.find().sort({ points: -1 })
        //query point >25 <100
        // const player = await Model.find({ points: { $gt: 25, $lt: 100 } }).sort({ points: -1 })
        return player;
    } catch (error) {

    }

}

const add = async (data) => {
    try {
        const { name, points, time } = data;
        if (!Number.isInteger(points) || points < 0) throw new Error("Điểm phải là số nguyên dương");
        if (!Number.isInteger(time) || time < 0) throw new Error("Time phải là số nguyên dương");
        const player = new Model();
        player.name = name;
        player.points = points;
        player.time = time;
        await player.save()
    } catch (error) {
        throw error;
    }

}

module.exports = { test, add }