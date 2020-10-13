export default class Repository {
    constructor(model) {
        this.model = model
    }

    getOne(conditions) {
        return this.model.findOne(conditions)
    }

    createOne(payload) {
        return this.model.create(payload)
    }

    getManyLimit(conditions) {
        return this.model.find(conditions.key).limit(conditions.limit)
    }
}