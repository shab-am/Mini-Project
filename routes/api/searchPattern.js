import express from 'express';
import Rescue from '../../models/Rescue.js';
import { spiralMotion, creepyLineMotion, addProperties } from '../../calcArea.js';

const router = express.Router();

/**
 * @route POST api/searchPattern/
 * @desc show the search pattern
 * @access Private
 */
router.post('/', async (req, res) => {
    try {
        const { filteredGrid } = req.body;
        const teams = await Rescue.find({});

        const updatedFeatures = filteredGrid.features.map(feature => {
            const rescueTeam = getRescueTeam(feature.rescue_team, teams);
            if (!rescueTeam) return feature;

            const pattern = getPattern(feature.pattern_type, feature.geometry.coordinates, rescueTeam.fieldofview);
            if (!pattern) return feature;

            return {
                ...feature,
                pattern,
                properties: addProperties(rescueTeam, pattern)
            };
        });

        res.status(201).json({
            ...req.body,
            filteredGrid: {
                ...filteredGrid,
                features: updatedFeatures
            }
        });
    } catch (error) {
        console.error('Search pattern error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Helper functions
const getRescueTeam = (teamType, teams) => {
    const teamMap = {
        'helicopterA': teams[0],
        'helicopterB': teams[1],
        'drone': teams[2]
    };
    return teamMap[teamType];
};

const getPattern = (patternType, coordinates, fieldOfView) => {
    const patternMap = {
        'expanded_square': () => spiralMotion(coordinates, fieldOfView),
        'creepy_line': () => creepyLineMotion(coordinates, fieldOfView)
    };
    return patternMap[patternType]?.();
};

export default router;
