function Shooting () {
    Shoot = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    Shoot.set(LedSpriteProperty.Brightness, 128)
    for (let index = 0; index < 4; index++) {
        Shoot.change(LedSpriteProperty.Y, -1)
        basic.pause(150)
        if (Shoot.isTouching(Enemy)) {
            Shoot.delete()
            Enemy.delete()
            game.addScore(10)
            Enemies = 0
        }
    }
    Shoot.delete()
}
function Reset () {
    led.setDisplayMode(DisplayMode.Greyscale)
    tx = 2
    Enemies = 0
    player = game.createSprite(tx, 4)
}
let acc_x = 0
let tx = 0
let Enemies = 0
let Enemy: game.LedSprite = null
let player: game.LedSprite = null
let Shoot: game.LedSprite = null
Reset()
basic.showIcon(IconNames.Skull)
basic.pause(2000)
basic.forever(function () {
    if (Enemies == 0) {
        Enemies = 1
        Enemy = game.createSprite(randint(0, 4), 0)
        Enemy.set(LedSpriteProperty.Brightness, 70)
        for (let index = 0; index < 4; index++) {
            basic.pause(200)
            Enemy.change(LedSpriteProperty.Y, 1)
        }
        if (Enemy.isTouching(player)) {
            game.gameOver()
        } else {
            Enemies = 0
            Enemy.delete()
        }
    }
})
basic.forever(function () {
    acc_x = input.acceleration(Dimension.X)
    if (Math.abs(acc_x) > 128) {
        tx += acc_x / Math.abs(acc_x)
        tx = Math.max(0, Math.min(tx, 4))
        player.set(LedSpriteProperty.X, tx)
    }
    basic.pause(100)
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        Shooting()
    }
})
