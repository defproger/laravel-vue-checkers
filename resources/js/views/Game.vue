<template>
    <div>
        <div class="card mb-5">
            <ul class="list-unstyled m-auto mb-1">
                <li>Вы играете за {{ userColor }}</li>
                <li>Сейчас ход {{ turn }}</li>
                <li v-if="canBeat">Вы можете побить пешку</li>
                <li v-if="canBeat" class="btn btn-outline-primary" @click="turnWhite = !turnWhite; canBeat = !canBeat">
                    Следующий ход
                </li>
            </ul>
        </div>
        <board
            :board-size="boardSize"
            :checkers-position="checkersPosition"
            :refresh="refreshServer"
            :kill="kill"
            :user-color="userColor"
            :turn="turn"
            :go-turn="function () {turnWhite = !turnWhite} "
            :can-beat-message="function () {canBeat = !canBeat}"
            :can-beat-status="canBeat"
        />
    </div>
</template>

<script>
import board from "../components/game/board";

export default {
    components: {
        board
    },
    data() {
        return {
            boardSize: 8,
            checkersPosition: [],
            userColor: 'white',
            turnWhite: true,
            canBeat: false,

        }
    },
    mounted() {
        this.startPositions();
        this.$echo.private('game.1').listen('Turn', (res) => {
            console.log(res);
        });
    },
    computed: {
        turn() {
            if (this.turnWhite) return 'white'
            else return 'black'
        }
    },
    methods: {
        startPositions() {
            let checkers = [];

            let posName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            let checkBlack = true;
            let position = '';
            let color = '';

            for (let i = 1; i <= this.boardSize; i++) {
                checkBlack = (i % 2) !== 0;
                if (i < this.boardSize / 2) color = 'white'
                else color = 'black'
                if (i <= 3 || i > this.boardSize - 3)
                    for (let j = 0; j < this.boardSize; j++) {
                        if (checkBlack) {
                            checkBlack = !checkBlack;
                            position = posName[j] + i
                            checkers.push({
                                position,
                                color
                            })
                        } else checkBlack = !checkBlack;
                    }
            }


            this.checkersPosition = checkers;
        },
        refresh(from, to) {
            this.checkersPosition.find(u => u.position === from).position = to
        },
        refreshServer(from, to) {
            this.refresh(from, to)
            axios.post('/api/turn', {
                turn: {
                    from: from,
                    to: to,
                },
                id: 1
            })
        },
        kill(die) {
            this.checkersPosition.splice(
                this.checkersPosition.indexOf(
                    this.checkersPosition.find(u => u.position === die)
                ), 1)
        },
    }
}
</script>

<style lang="scss">

</style>
