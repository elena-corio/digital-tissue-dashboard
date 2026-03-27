export const METRICS = {
    daylightPotential:{left: 0.00, right: 0.5, benchmark: 0.25},
    greenSpaceDistance: {left: 100.00, right: 0.00, benchmark: 50.00},
    programDiversityIndex: {left: 0.00, right: 1.00, benchmark: 0.5},
    circulationEfficiency: {left: 0.50, right: 1.00, benchmark: 0.75},
    usableAreaRatio: {left: 0.50, right: 1.00, benchmark: 0.75},
    netFloorAreaRatio: {left: 0.50, right: 1.00, benchmark: 0.75},
    carbonIntensity: {left: 500.00, right: 200.00, benchmark: 350.00},
    volumeToEnvelope: {left: 5.00, right: 15.00, benchmark: 10.0},
}

export const VITALITY = {
    floor_area_ratio: {min: 0.30, max: 1.00},
    gross_floor_area: {min: 1000000, max: 5000000},
    KPIs_score: {min: 8.00, max: 8.00}
}