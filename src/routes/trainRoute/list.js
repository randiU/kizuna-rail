import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    const { region = 'all', season = 'all' } = req.query;

    //testing query params
    console.log(req.query.region);
    console.log(req.query.season);

    // Filter routes based on region and season
    //.filter returns a new array, so the original doesn't get altered. This allows us to apply multiple filters sequentially without modifying the original dataset.
    let filteredRoutes = routes;
    if (region && region !== 'all') {
        filteredRoutes = filteredRoutes.filter(route => route.region === region);
    }
    if (season && season !== 'all') {
        filteredRoutes = filteredRoutes.filter(route => route.bestSeason === season);
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes: filteredRoutes,
        seasons,
        region,
        season
    });
};