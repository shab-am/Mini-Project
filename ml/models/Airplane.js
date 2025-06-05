import mongoose from 'mongoose';
const { Schema } = mongoose;

const airplaneSchema = new Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    direction: {
        type: Number,
        required: true
    },
    weather: {
        type: String,
        required: true
    },
    velocity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    altitude: {
        type: Number,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Add indexes for frequently queried fields
airplaneSchema.index({ latitude: 1, longitude: 1 });
airplaneSchema.index({ category: 1 });

const Airplane = mongoose.model('Airplane', airplaneSchema);

export default Airplane;