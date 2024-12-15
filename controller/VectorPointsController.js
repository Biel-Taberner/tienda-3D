import VectorPointsService from "../service/VectorPointsService";

export default class VectorPointsController {

    #vectorPointsService;

    constructor() {
        this.#vectorPointsService = new VectorPointsService();
    }

    async getAllVectorPoints() {
        return this.#vectorPointsService.getAllVectorPoints();
    }

}