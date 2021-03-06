cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        play_onload: false,
        time: 0.1,
        delta_y: 100,
        start_height: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.shenzi = this.node.getChildByName("gan");
        this.evl = this.node.getChildByName("mutou");
        this.is_moving = false;
        
        if(this.play_onload) {
            this.move_by(this.time, this.delta_y);
        }
    },
    
    start: function() {
        if(this.start_height > 0) {
            this.shenzi.height = this.start_height;
            this.evl.y = this.shenzi.height;
        }    
    }, 
    
    add_by: function(d_len) {
        this.shenzi.height += d_len;
        this.evl.y = this.shenzi.height;
    },

    move_by: function(time, dy) {
        this.move_len = dy;
        this.move_time = time;
        this.is_moving = true;
        this.move_speed = dy / time;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.is_moving) {
            return;
        }
        var s = this.move_speed * dt;
        if (this.move_speed > 0) {
            
            if (s > this.move_len) {
                s = this.move_len;
            }
            this.move_len -= s;
            this.shenzi.height += s;
            this.evl.y = this.shenzi.height;
            if(this.move_len <= 0) {
                this.is_moving = false;
            }
        }
        else {
            if (s < this.move_len) {
                s = this.move_len;
            }
            this.move_len -= s;
            this.shenzi.height += s;
            this.evl.y = this.shenzi.height;
            if(this.move_len >= 0) {
                this.is_moving = false;
            }
        }
    },
});
