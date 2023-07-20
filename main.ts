function Bomb () {
    music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.InBackground)
    basic.showLeds(`
        . . . # .
        . . # . #
        # # # . .
        # . # . .
        # # # . .
        `)
    basic.pause(50)
    basic.showLeds(`
        . . . # .
        . . # . .
        # # # . .
        # . # . .
        # # # . .
        `)
    basic.pause(50)
    basic.showLeds(`
        . . . . .
        . . # . .
        # # # . .
        # . # . .
        # # # . .
        `)
    basic.pause(50)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # . .
        # . # . .
        # # # . .
        `)
    basic.pause(100)
    basic.showLeds(`
        . # . # .
        # . # . #
        . . . # .
        . # . . #
        . . . # .
        `)
    basic.pause(150)
    basic.clearScreen()
}
input.onButtonPressed(Button.AB, function () {
    if (ID == B_Player) {
        B_Player = randint(1, Num_Players)
        radio.sendValue("B_Player", B_Player)
    }
})
input.onGesture(Gesture.ScreenDown, function () {
    if (ID == 0) {
        Num_Players += 1
        ID = Num_Players
        radio.sendValue("NP", Num_Players)
    }
    if (X == 5 && Y == 5) {
        X = 0
        Y = 0
    }
    basic.showNumber(ID)
    basic.pause(200)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    if (ID == B_Player) {
        if (Num_Players > 1) {
            B_Player += -1
        } else {
            B_Player = Num_Players
        }
        radio.sendValue("B_Player", B_Player)
    }
})
input.onGesture(Gesture.SixG, function () {
    if (ID == 1) {
        Bomb_Time = randint(400, 600)
        radio.sendValue("Time", Bomb_Time)
        B_Player = 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (ID == B_Player) {
        if (B_Player < Num_Players) {
            B_Player += 1
        } else {
            B_Player = 1
        }
        radio.sendValue("B_Player", B_Player)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "NP") {
        Num_Players = value
    }
    if (name == "Time") {
        Bomb_Time = value
    }
    if (name == "B_Player") {
        B_Player = value
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showNumber(ID)
    basic.pause(200)
    basic.clearScreen()
})
let B_Player = 0
let X = 0
let Y = 0
let Bomb_Time = 0
let ID = 0
let Num_Players = 0
radio.setGroup(10)
Num_Players = 0
ID = 0
Bomb_Time = 0
Y = 0
X = 0
let Z = 0
B_Player = 0
Bomb()
basic.forever(function () {
    if (X == 5 && Y == 5) {
        basic.showIcon(IconNames.Heart)
        basic.pause(75)
        basic.showIcon(IconNames.No)
        basic.pause(500)
        basic.clearScreen()
    } else if (Bomb_Time != 0) {
        while (Y < 6 && ID == B_Player) {
            X = 0
            while (X < 6 && ID == B_Player) {
                Z = 0
                while (Z < 7 && ID == B_Player) {
                    basic.pause(Bomb_Time / 6)
                    Z += 1
                }
                led.plot(X, Y)
                X += 1
            }
            Y += 1
        }
    }
})
