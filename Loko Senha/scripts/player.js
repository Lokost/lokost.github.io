class Player {
    name;
    id;
    host;
    score;

    constructor(name, host) {
        this.name = name;
        this.id = this.genId();
        this.host = host;
        this.score = 0;
    }

    toObj() {
        return {
            name: this.name,
            id: this.id,
            host: this.host,
            score: this.score
        }
    }

    genId() {
        let id = ""
        for (let i = 0; i < 8; i++) {
            let rand = Math.floor(Math.random() * 10);
            id += rand.toString();
        }

        return id;
    }
}

export {
    Player
}