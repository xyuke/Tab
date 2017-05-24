;(function($){
	
	var Tab = function(tab){

		var _this_ = this;

		this.tab = tab;
		this.tabItems = this.tab.find("ul.tab-nav li");
		this.contentItems = this.tab.find("div.content-wrap div.content-item");
		this.loop = 0;

		this.config = {
			"triggerType":"mouseover",
			"effect":"defult",
			"invoke":"2",
			"auto":5000
		}
		if(this.getConfig()){
			$.extend(this.config,this.getConfig())
		}
		console.log(this.config)

		var config = this.config;

		if(config.triggerType === "click"){
			this.tabItems.bind(config.triggerType,function(){
				_this_.invoke($(this));
				_this_.loop = $(this).index();
			});
		}else if(config.triggerType === "mouseover"||config.triggerType !== "click"){
			this.tabItems.bind("mouseover",function(){
				_this_.invoke($(this));
			});
		};
		if(config.auto){
			this.timer = null;
			this.autoPlay()
			this.tab.hover(function(){
				clearInterval(_this_.timer)
			},function(){
				_this_.autoPlay()
			})
		}
	}

	Tab.prototype = {
		//获取配置参数
		getConfig:function(){
			var config = this.tab.attr("data-config")
			if(config&&config!==""){
				return $.parseJSON(config)
			}else{
				return null;
			}
		},
		//事件驱动函数
		invoke:function(currentTab){
			var _this_ = this;

			var index = currentTab.index();

			var effect = this.config.effect;
			var contentItem = this.contentItems;
			currentTab.addClass("active").siblings().removeClass();

			if(effect === "default"||effect !== "fade"){
				contentItem.eq(index).addClass("current").siblings().removeClass("current")
			}else if(effect === "fade"){
				contentItem.eq(index).fadeIn().siblings().fadeOut();
			}
		},
		autoPlay:function(){
			var self = this,
				tabItems = this.tabItems,
				tabLength = tabItems.size(),
				config = this.config;
			this.timer = window.setInterval(function(){
				self.loop++;
				if(self.loop>=tabLength){
					self.loop = 0;
				}
				tabItems.eq(self.loop).trigger(config.triggerType)
			},config.auto)
		}

	}

	window.Tab = Tab
})(jQuery) 