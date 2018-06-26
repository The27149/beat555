/*
* name;
*/

module view {
    export class mainView extends ui.mainUI{
                private mouses:Array<Mouse> = new Array<Mouse>();
                private mousesNumb:number = 9;
                private time:number = 90;
                private score:number = 0;
                private hammer: Hammer;
                constructor(){ 
                    super();
                    this.init();
                    this.start();
                }

                //初始化
                init():void{
                    this.timeBar.value = 1;
                    this.score = 0;
                    this.createMouse();
                }

                //游戏启动
                start():void{
                    Laya.timer.loop(1000,this,this.onLoop);
                    Laya.timer.loop(1000,this,this.timeCount);
                }

                //倒计时
                timeCount():void{
                    this.timeBar.value -= 1 / this.time;
                    if(this.timeBar.value <= 0) this.gameOver();
                }

                //游戏结束
                gameOver():void{
                    Laya.timer.clear(this,this.timeCount);
                    Laya.timer.clear(this,this.onLoop);
                    this.hammer.end();
                    console.log('游戏结束！');
                    console.log(this.timeBar.value);
                }

                //创建地鼠实例和锤子实例
                createMouse():void{
                    var box:Laya.Box,
                        mouse:Mouse,
                        hitHander: Laya.Handler = Laya.Handler.create(this,this.setScore,null,false);
                    for (var i:number = 0; i < this.mousesNumb; i++) {
                        box = this.getChildByName('mouseBox').getChildByName('item' + i) as Laya.Box;
                        mouse = new Mouse(box.getChildByName('normal') as Laya.Image,box.getChildByName('hit') as Laya.Image,box.getChildByName('scoreImg') as Laya.Image,26,hitHander);
                        this.mouses.push(mouse);
                    }
                    this.hammer = new Hammer();
                    this.addChild(this.hammer);
                }

                //主循环
                onLoop():void{
                    var index:number = Math.floor(Math.random() * this.mousesNumb);
                    this.mouses[index].show();
                }

                //修改分数
                setScore(type:number):void{
                    this.score += (type == 1)?-100:100;
                    if(this.score < 0)this.score = 0; 
                    this.updateScore();  
                }
                
                //更新分数显示
                updateScore():void{ 
                    var data: any = {},
                        temp:number = this.score,
                        len:number = 10 - this.score.toString().length;
                    for(var j:number = 0;j<len;j++){
                            (this.scoreBox.getChildByName('item' + j) as Laya.Clip).alpha = 0;
                        }
                    for(var i:number = 9; i>= len;i--){
                        data['item' + i] = {index:Math.floor(temp % 10)};
                        (this.scoreBox.getChildByName('item' + i) as Laya.Clip).alpha = 1;
                        temp /= 10;
                    }
                    this.scoreBox.dataSource = data;
                }
    }

    //锤子视图类
    export class Hammer extends ui.HammerUI{
        constructor(){
            super();
            this.start();
        }

        //开始使用
        start():void{
            Laya.Mouse.hide();
            this.visible = true;
            Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
        }

        //结束使用
        end():void{
            Laya.Mouse.show();
            this.visible = false;
            Laya.stage.off(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
            Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
        }

        onMouseDown():void{
            this.hit.play(0,false);
        }

        onMouseMove():void{
            this.pos(Laya.stage.mouseX - 0.4 * this.width,Laya.stage.mouseY - 0.3 * this.height);
        }
    }
}
