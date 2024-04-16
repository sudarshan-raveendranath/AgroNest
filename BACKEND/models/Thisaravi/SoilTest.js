const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const soilTestSchema = new Schema({
    soilTestType: {
        type: String,
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    areaOfCultivation: {
        type: Number,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    laboratory: {
        type: Schema.Types.ObjectId,
        ref: 'Laboratory'
    }
});

const SoilTest = mongoose.model("SoilTest", soilTestSchema);

module.exports = SoilTest;