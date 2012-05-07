
define(["vendor/Handlebars", "./Templates"], function(Handlebars, Templates) {
  var ImpressRenderer;
  ImpressRenderer = (function() {

    function ImpressRenderer() {
      Handlebars.registerHelper("renderComponent", function(componentModel) {
        var result;
        result = "";
        switch (componentModel.constructor.name) {
          case "ImageModel":
            result = Templates.Image(componentModel.attributes);
            break;
          case "TextBox":
            result = Templates.TextBox(componentModel.attributes);
        }
        return new Handlebars.SafeString(result);
      });
      Handlebars.registerHelper("scaleX", function(x) {
        return x * 1024 / 150;
      });
      Handlebars.registerHelper("scaleY", function(y) {
        return y * 1024 / 150;
      });
      Handlebars.registerHelper("toDeg", function(v) {
        return v * 180 / Math.PI;
      });
      Handlebars.registerPartial("ComponentContainer", Templates.ComponentContainer);
    }

    ImpressRenderer.prototype.render = function(deckAttrs) {
      var cnt, colCnt, slides,
        _this = this;
      slides = deckAttrs.slides;
      colCnt = 6;
      cnt = 0;
      slides.each(function(slide) {
        var x;
        x = slide.get("x");
        if (!(x != null)) {
          slide.set("x", cnt * 160 + 30);
          slide.set("y", ((cnt / colCnt) | 0) * 160 + 80);
        }
        return ++cnt;
      });
      return Templates.ImpressTemplate(deckAttrs);
    };

    return ImpressRenderer;

  })();
  return new ImpressRenderer();
});
