/*
* name;
*/
var Mouse = (function () {
    function Mouse(normalState, hitState, scoreImg, downY, hitCallBack) {
        this.normalState = normalState;
        this.hitState = hitState;
        this.scoreImg = scoreImg;
        this.scoreY = scoreImg.y;
        this.downY = downY;
        this.upY = this.normalState.y;
        this.hitCallBack = hitCallBack;
        this.reset();
        this.normalState.on(Laya.Event.MOUSE_DOWN, this, this.hit);
    }
    Mouse.prototype.reset = function () {
        this.normalState.visible = false;
        this.hitState.visible = false;
        this.scoreImg.visible = false;
        this.isActive = false;
        this.isShow = false;
        this.isHit = false;
    };
    //显示(向上缓动)
    Mouse.prototype.show = function () {
        if (this.isActive)
            return;
        this.isActive = true;
        this.isShow = true;
        this.type = Math.random() < 0.5 ? 1 : 2;
        this.normalState.skin = 'ui/mouse_normal_' + this.type + '.png';
        this.hitState.skin = 'ui/mouse_hit_' + this.type + '.png';
        this.scoreImg.skin = 'ui/score_' + this.type + '.png';
        this.normalState.y = this.downY;
        this.normalState.visible = true;
        Laya.Tween.to(this.normalState, { y: this.upY }, 400, Laya.Ease.backOut, Laya.Handler.create(this, this.showComplete));
    };
    //停留
    Mouse.prototype.showComplete = function () {
        if (this.isShow && !this.isHit) {
            Laya.timer.once(1500, this, this.hide);
        }
    };
    //消失(向下缓动)
    Mouse.prototype.hide = function () {
        if (this.isShow && !this.isHit) {
            Laya.Tween.to(this.normalState, { y: this.downY }, 250, Laya.Ease.backIn, Laya.Handler.create(this, this.reset));
        }
    };
    //受击
    Mouse.prototype.hit = function () {
        if (this.isShow && !this.isHit) {
            this.isHit = true;
            Laya.timer.clear(this, this.hide);
            this.normalState.visible = false;
            this.hitState.visible = true;
            this.hitCallBack.runWith(this.type);
            Laya.timer.once(300, this, this.reset);
            this.showScore();
        }
    };
    //显示头顶飘字
    Mouse.prototype.showScore = function () {
        this.scoreImg.y = this.scoreY + 50;
        this.scoreImg.scale(0, 0);
        this.scoreImg.visible = true;
        Laya.Tween.to(this.scoreImg, { y: this.scoreY - 30, scaleX: 1, scaleY: 1 }, 600, Laya.Ease.backOut);
    };
    return Mouse;
}());
//# sourceMappingURL=mouse.js.map