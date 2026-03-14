export const METRICS = {
    daylightPotential:{left: 0.00, right: 0.5, benchmark: 0.25},
    greenSpaceDistance: {left: 300.00, right: 0.00, benchmark: 150.00},
    programDiversityIndex: {left: 0.00, right: 1.00, benchmark: 0.75},
    circulationEfficiency: {left: 0.00, right: 1.00, benchmark: 0.75},
    usableAreaRatio: {left: 0.00, right: 1.00, benchmark: 0.75},
    netFloorAreaRatio: {left: 0.00, right: 1.00, benchmark: 0.75},
    carbonIntensity: {left: 1000.00, right: 0.00, benchmark: 500.00},
    volumeToEnvelope: {left: 0.00, right: 15.00, benchmark: 12.50},
}

export const VITALITY = {
    floor_area_ratio: {min: 0.30, max: 1.00},
    gross_floor_area: {min: 1000000, max: 5000000},
    KPIs_score: {min: 8.00, max: 8.00}
}