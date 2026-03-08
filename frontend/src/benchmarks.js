export const METRICS = {
    daylightPotential:{min: 0.00, max: 1.00, benchmark: 0.25,unit: '', type: 'higher-is-better'},
    greenSpaceDistance: {min: 0.00, max: 500.00, benchmark: 300.00, unit: 'm', type: 'lower-is-better'},
    programDiversity: {min: 0.00, max: 1.00, benchmark: 0.75, unit: '', type: 'higher-is-better'},
    circulationEfficiency: {min: 0.00, max: 1.00, benchmark: 0.75, unit: '', type: 'higher-is-better'},
    usableAreaRatio: {min: 0.00, max: 1.00, benchmark: 0.75, unit: '', type: 'higher-is-better'},
    netFloorAreaRatio: {min: 0.00, max: 1.00, benchmark: 0.85, unit: '', type: 'higher-is-better'},
    carbonIntensity: {min: 0.00, max: 1000.00, benchmark: 500.00, unit: 'kgCO2/m2', type: 'lower-is-better'},
    volumeToSurface: {min: 0.00, max: 15.00, benchmark: 12.50, unit: 'm3/m2', type: 'higher-is-better'},
}

export const VITALITY = {
    floor_area_ratio: {min: 0.30, max: 1.00, unit: ''},
    gross_floor_area: {min: 1000000, max: 5000000, unit: 'm2'},
    KPIs_score: {min: 8.00, max: 8.00, unit: ''}
}