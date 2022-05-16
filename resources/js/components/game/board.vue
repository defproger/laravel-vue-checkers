<template>
    <div class="board">
        <div
            v-for="space in spaces"
            :class="space.color" class="space"
            @click="setPosition(space)"
        >
            <div v-if="space.checker !== undefined && space.color === 'black'"
                 :class="{
                    white: space.checker === 'white',
                    black: space.checker === 'black',
                    active: active.index === space.position,
                 }"
                 class="checker"
                 @click="getActive(space.position, space.checker)"
            ></div>
            <span>{{ space.position }}</span>
        </div>
    </div>
</template>

<script>

export default {
    props: [
        'boardSize',
        'checkersPosition',
        'refresh',
        'kill',
        'userColor',
        'turn',
        'goTurn',
        'canBeatMessage',
        'canBeatStatus'
    ],
    data() {
        return {
            active: {
                index: null,
                checker: null
            },
            posName: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

        }
    },

    computed: {
        spaces() {
            let boardSize = this.boardSize;

            let space = [];
            let checker = '';

            //карта для чёрных
            if (this.userColor === 'black') {
                this.blackSideGame(boardSize, space);
            }
            //карта для белых
            else if (this.userColor === 'white') {
                this.whiteSideGame(boardSize, space);
            }

            //расстановка пешек
            if (this.checkersPosition !== undefined)
                for (checker of this.checkersPosition) {
                    if (space.find(u => u.position === checker.position) === undefined) console.log('this ' + checker.position)
                    space.find(u => u.position === checker.position).checker = checker.color
                }

            return space;
        }
    },
    methods: {
        setPosition(space) {
            let index = this.active.index;
            let checker = this.active.checker;
            if (this.userColor === checker && this.turn === this.userColor && index !== space.position && space.checker === undefined && space.color === 'black') {
                let diffNum = index[1] - space.position[1];

                let spacePos = this.posName.indexOf(index[0])
                let checkerPos = this.posName.indexOf(space.position[0])
                let diffPos = checkerPos - spacePos;

                if (diffPos === 1 || diffPos === -1) {
                    //ход
                    if (diffNum > 0 && checker === 'black' || diffNum < 0 && checker === 'white') {
                        this.refresh(index, space.position)
                        this.goTurn();
                    }
                } else {
                    //бой
                    this.killHandler(index, space, checker)
                }
            }
        },
        getActive(index, checker) {
            if (this.userColor === checker && this.turn === this.userColor)
                this.active = {
                    index,
                    checker
                }
        },
        canBeat(nowPosition, checker) {
            let letter = this.posName.indexOf(nowPosition[0]);
            let number = Number(nowPosition[1]);
            let killChecker = [];
            let space = [];

            killChecker[0] = this.checkersPosition
                .find(u => u.position === this.posName[letter + 1] + (number + 1));
            space[0] = this.spaces.find(u => u.position === this.posName[letter + 2] + (number + 2));

            killChecker[1] = this.checkersPosition
                .find(u => u.position === this.posName[letter + 1] + (number - 1));
            space[1] = this.spaces.find(u => u.position === this.posName[letter + 2] + (number + 2));

            killChecker[2] = this.checkersPosition
                .find(u => u.position === this.posName[letter - 1] + (number + 1));
            space[2] = this.spaces.find(u => u.position === this.posName[letter + 2] + (number + 2));

            killChecker[3] = this.checkersPosition
                .find(u => u.position === this.posName[letter - 1] + (number - 1));
            space[3] = this.spaces.find(u => u.position === this.posName[letter + 2] + (number + 2));

            for (let i = 0; i < 4; i++) {
                if (killChecker[i] !== undefined && killChecker[i].color !== checker && space[i] !== undefined && space[i].checker === undefined)
                    return true;
            }

            return false;
        },
        checkTurnBeat(diffNum) {
            let checkLetter = null;
            if (diffPos === 2) {
                checkLetter = this.posName[checkerPos - 1]
            } else if (diffPos === -2) {
                checkLetter = this.posName[checkerPos + 1]
            }

            let checkNum = null;
            if (diffNum === 2) {
                checkNum = index[1] - 1;
            } else if (diffNum === -2) {
                checkNum = Number(index[1]) + 1;
            }
            return checkLetter + checkNum;
        },
        killHandler(index, space, checker) {
            //проверка на вражескую пешку
            let checkPosition = this.checkTurnBeat();
            ///////////////
            let killChecker = this.checkersPosition.find(u => u.position === checkPosition);
            if (checkPosition !== null && killChecker !== undefined && killChecker.color !== checker) {
                this.kill(checkPosition)
                this.refresh(index, space.position)

                //закрыть сообщение
                if (this.canBeatStatus)
                    this.canBeatMessage();
                //открыть сообщение или вперёд
                if (this.canBeat(space.position, checker)) this.canBeatMessage();
                else this.goTurn();
            }
        },
        whiteSideGame(boardSize, space) {
            let posName = this.posName;
            let color = '';
            let LetterNum = 1;
            let position = '';
            let row = boardSize;
            for (let i = boardSize * boardSize; i >= 1; i--) {
                if (i % boardSize === 0 && i !== boardSize * boardSize) {
                    row--;
                }


                if (row % 2) {
                    if (i % 2) {
                        color = 'black';
                    } else {
                        color = 'white';
                    }
                } else {
                    if (i % 2) {
                        color = 'white';
                    } else {
                        color = 'black';
                    }
                }

                if (i % boardSize !== 0) LetterNum = i % boardSize;
                else LetterNum = boardSize
                position = posName[LetterNum - 1] + row;


                space.push({
                    color,
                    position,
                })
            }

        },
        blackSideGame(boardSize, space) {
            let posName = this.posName;
            let color = '';
            let row = 1;
            let LetterNum = 1;
            let position = '';

            for (let i = 1; i <= boardSize * boardSize; i++) {
                if (row % 2) {
                    if (i % 2) {
                        color = 'black';
                    } else {
                        color = 'white';
                    }
                } else {
                    if (i % 2) {
                        color = 'white';
                    } else {
                        color = 'black';
                    }
                }

                if (i % boardSize !== 0) LetterNum = i % boardSize;
                else LetterNum = boardSize
                position = posName[LetterNum - 1] + row;


                if (i % boardSize === 0)
                    row++;


                space.push({
                    color,
                    position,
                })
            }
        }
    }

}
</script>

<style lang="scss">
.board {
    display: grid;
    width: 800px;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    margin: auto;
}

.space {
    width: 100px;
    height: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

    &.white {
        background: #fff0d5;
    }

    &.black {
        background: #835701;
    }

    span {
        position: relative;
        transform: translate(36px, 39px);
    }
}

.checker {
    width: 75px;
    height: 75px;
    border-radius: 100%;
    position: absolute;

    &.white {
        background: #fff;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.15) inset;
    }

    &.black {
        background: #000;
        box-shadow: 0 0 33px rgba(255, 255, 255, 0.42) inset;
    }

    &.active {
        border: 3px solid rgb(159, 159, 255);
    }
}
</style>
