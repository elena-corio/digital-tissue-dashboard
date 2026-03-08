export const METRICS = {
    daylightPotential:{left: 0.00, right: 1.00, benchmark: 0.25,unit: ''},
    greenSpaceDistance: {left: 500.00, right: 0.00, benchmark: 300.00, unit: 'm'},
    programDiversity: {left: 0.00, right: 1.00, benchmark: 0.75, unit: ''},
    circulationEfficiency: {left: 0.00, right: 1.00, benchmark: 0.75, unit: ''},
    usableAreaRatio: {left: 0.00, right: 1.00, benchmark: 0.75, unit: ''},
    netFloorAreaRatio: {left: 0.00, right: 1.00, benchmark: 0.85, unit: ''},
    carbonIntensity: {left: 1000.00, right: 0.00, benchmark: 500.00, unit: 'kgCO2/m2'},
    volumeToSurface: {left: 0.00, right: 15.00, benchmark: 12.50, unit: 'm3/m2'},
}

export const VITALITY = {
    floor_area_ratio: {min: 0.30, max: 1.00, unit: ''},
    gross_floor_area: {min: 1000000, max: 5000000, unit: 'm2'},
    KPIs_score: {min: 8.00, max: 8.00, unit: ''}
}