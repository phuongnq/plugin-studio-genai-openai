(function () {
  'use strict';

  (function () {
    CrafterCMSNext.React;
    CrafterCMSNext.ReactDOM;
    CrafterCMSNext.components.CrafterCMSNextBridge;
    CrafterCMSNext.components.ConfirmDialog;
    CStudioForms.Controls.TextGen = CStudioForms.Controls.TextGen || function (id, form, owner, properties, constraints) {
      this.owner = owner;
      this.owner.registerField(this);
      this.errors = [];
      this.properties = properties;
      this.constraints = constraints;
      this.inputEl = null;
      this.countEl = null;
      this.required = false;
      this.value = '_not-set';
      this.form = form;
      this.id = id;
      this.supportedPostFixes = ['_s'];
      return this;
    };
    YAHOO.extend(CStudioForms.Controls.TextGen, CStudioForms.CStudioFormField, {
      getLabel: function getLabel() {
        return 'OpenAI Text Generator';
      },
      _renderReactComponent: function _renderReactComponent(obj) {
        var instrumentTimer = setInterval(function () {
          if (typeof $ !== 'function') return;
          var inputEls = $.find('.cstudio-form-control-input');
          if (inputEls) {
            inputEls.forEach(function (element) {
              var parentElement = element.parentNode;
              var buttonEl = document.createElement("button");
              buttonEl.innerHTML = "Help Me Write";
              buttonEl.style = "background: rgb(44, 109, 178); border: none; color: white; text-align: center; border-radius: 20px; margin: 5px;";
              buttonEl.parentEl = element;
              buttonEl.onclick = function () {
                var _this = this;
                var subject = prompt("Tell me about the subject");
                var api = window.location.protocol + "//" + window.location.host + "/api/plugins/org/rd/plugin/openai/openai/suggest.json?" + "subject=" + subject + "&fieldName=Title";
                fetch(api, {
                  method: 'GET'
                }).then(function (response) {
                  return response.json();
                }).then(function (result) {
                  var text = result[0].text;
                  text = text.replaceAll('"', "");
                  _this.parentEl.value = text;
                });
              };
              parentElement.appendChild(buttonEl);
            });
          }
          clearInterval(instrumentTimer);
        }, 3000);
      },
      render: function render(config, containerEl) {
        containerEl.id = this.id;
        this._renderReactComponent(this);
      },
      getValue: function getValue() {
        return this.value;
      },
      setValue: function setValue(value) {
        this.value = value;
      },
      getName: function getName() {
        return 'textgen';
      },
      getSupportedProperties: function getSupportedProperties() {
        return [];
      },
      getSupportedConstraints: function getSupportedConstraints() {
        return [];
      },
      getSupportedPostFixes: function getSupportedPostFixes() {
        return this.supportedPostFixes;
      }
    });
    CStudioAuthoring.Module.moduleLoaded('textgen', CStudioForms.Controls.TextGen);
  })();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3BhY2thZ2VzL29wZW5haS1jb21wb25lbnRzL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICB2YXIgUmVhY3QgPSBDcmFmdGVyQ01TTmV4dC5SZWFjdDtcbiAgdmFyIFJlYWN0RE9NID0gQ3JhZnRlckNNU05leHQuUmVhY3RET007XG4gIHZhciBDcmFmdGVyQ01TTmV4dEJyaWRnZSA9IENyYWZ0ZXJDTVNOZXh0LmNvbXBvbmVudHMuQ3JhZnRlckNNU05leHRCcmlkZ2U7XG4gIHZhciBDb25maXJtRGlhbG9nID0gQ3JhZnRlckNNU05leHQuY29tcG9uZW50cy5Db25maXJtRGlhbG9nO1xuXG4gIGZ1bmN0aW9uIFRleHRHZW4ocHJvcHMpIHtcbiAgICBjb25zdCBbaXNEaWFsb2dPcGVuLCBzZXRJc0RpYWxvZ09wZW5dID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtsb2NhbGUsIHNldExvY2FsZV0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5sb2NhbGUpO1xuXG4gICAgY29uc3QgREVGQVVMVF9GSUVMRFNfTUFYX0xFTkdUSCA9IDUwO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcblxuICAgIH0sIFtdKTtcblxuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICB7IHRydWUgKFxuICAgICAgICA8PlxuICAgICAgICAgIEZvb1xuICAgICAgICAgIDxDcmFmdGVyQ01TTmV4dEJyaWRnZT5cbiAgICAgICAgICAgIEJhclxuICAgICAgICAgIDwvQ3JhZnRlckNNU05leHRCcmlkZ2U+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICBDU3R1ZGlvRm9ybXMuQ29udHJvbHMuVGV4dEdlbiA9IENTdHVkaW9Gb3Jtcy5Db250cm9scy5UZXh0R2VuIHx8IGZ1bmN0aW9uIChpZCwgZm9ybSwgb3duZXIsIHByb3BlcnRpZXMsIGNvbnN0cmFpbnRzKSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIHRoaXMub3duZXIucmVnaXN0ZXJGaWVsZCh0aGlzKTtcbiAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgdGhpcy5jb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzO1xuICAgIHRoaXMuaW5wdXRFbCA9IG51bGw7XG4gICAgdGhpcy5jb3VudEVsID0gbnVsbDtcbiAgICB0aGlzLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgdGhpcy52YWx1ZSA9ICdfbm90LXNldCc7XG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5zdXBwb3J0ZWRQb3N0Rml4ZXMgPSBbJ19zJ107XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBZQUhPTy5leHRlbmQoQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLlRleHRHZW4sIENTdHVkaW9Gb3Jtcy5DU3R1ZGlvRm9ybUZpZWxkLCB7XG4gICAgZ2V0TGFiZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnT3BlbkFJIFRleHQgR2VuZXJhdG9yJztcbiAgICB9LFxuXG4gICAgX3JlbmRlclJlYWN0Q29tcG9uZW50OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGNvbnN0IGluc3RydW1lbnRUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIFxuICAgICAgICBpZiAodHlwZW9mICQgIT09ICdmdW5jdGlvbicpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlucHV0RWxzID0gJC5maW5kKCcuY3N0dWRpby1mb3JtLWNvbnRyb2wtaW5wdXQnKVxuICAgICAgICBcbiAgICAgICAgaWYoaW5wdXRFbHMpIHtcbiAgICAgICAgICBpbnB1dEVscy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHZhciBidXR0b25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICAgICAgICAgIGJ1dHRvbkVsLmlubmVySFRNTCA9IFwiSGVscCBNZSBXcml0ZVwiO1xuICAgICAgICAgICAgYnV0dG9uRWwuc3R5bGUgPSBcImJhY2tncm91bmQ6IHJnYig0NCwgMTA5LCAxNzgpOyBib3JkZXI6IG5vbmU7IGNvbG9yOiB3aGl0ZTsgdGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItcmFkaXVzOiAyMHB4OyBtYXJnaW46IDVweDtcIjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnV0dG9uRWwucGFyZW50RWwgPSBlbGVtZW50O1xuICAgICAgICAgICAgYnV0dG9uRWwub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgdmFyIHN1YmplY3QgPSBwcm9tcHQoXCJUZWxsIG1lIGFib3V0IHRoZSBzdWJqZWN0XCIpO1xuXG4gICAgICAgICAgICAgIGNvbnN0IGFwaSA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCBcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIvL1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgKyB3aW5kb3cubG9jYXRpb24uaG9zdCBcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIvYXBpL3BsdWdpbnMvb3JnL3JkL3BsdWdpbi9vcGVuYWkvb3BlbmFpL2dlbnRleHQuanNvbj9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInN1YmplY3Q9XCIrc3ViamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiZmaWVsZE5hbWU9VGl0bGVcIjtcblxuXG4gICAgICAgICAgICAgIGZldGNoKGFwaSwgeyBtZXRob2Q6ICdHRVQnfSlcbiAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKSAgICAgIFxuICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSByZXN1bHRbMF0udGV4dDtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlQWxsKCdcIicsXCJcIikgXG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEVsLnZhbHVlID0gIHRleHQ7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkVsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnN0cnVtZW50VGltZXIpO1xuICAgICAgXG4gICAgICB9LCAzMDAwKTtcblxuXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKGNvbmZpZywgY29udGFpbmVyRWwpIHtcbiAgICAgIGNvbnRhaW5lckVsLmlkID0gdGhpcy5pZDtcbiAgICAgIHRoaXMuX3JlbmRlclJlYWN0Q29tcG9uZW50KHRoaXMpO1xuICAgIH0sXG5cbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfSxcblxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgZ2V0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICd0ZXh0Z2VuJztcbiAgICB9LFxuXG4gICAgZ2V0U3VwcG9ydGVkUHJvcGVydGllczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgZ2V0U3VwcG9ydGVkQ29uc3RyYWludHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZFBvc3RGaXhlczogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3VwcG9ydGVkUG9zdEZpeGVzO1xuICAgIH1cbiAgfSk7XG5cbiAgQ1N0dWRpb0F1dGhvcmluZy5Nb2R1bGUubW9kdWxlTG9hZGVkKCd0ZXh0Z2VuJywgQ1N0dWRpb0Zvcm1zLkNvbnRyb2xzLlRleHRHZW4pO1xufSkoKTsiXSwibmFtZXMiOlsiQ3JhZnRlckNNU05leHQiLCJSZWFjdCIsIlJlYWN0RE9NIiwiY29tcG9uZW50cyIsIkNyYWZ0ZXJDTVNOZXh0QnJpZGdlIiwiQ29uZmlybURpYWxvZyIsIkNTdHVkaW9Gb3JtcyIsIkNvbnRyb2xzIiwiVGV4dEdlbiIsImlkIiwiZm9ybSIsIm93bmVyIiwicHJvcGVydGllcyIsImNvbnN0cmFpbnRzIiwicmVnaXN0ZXJGaWVsZCIsImVycm9ycyIsImlucHV0RWwiLCJjb3VudEVsIiwicmVxdWlyZWQiLCJ2YWx1ZSIsInN1cHBvcnRlZFBvc3RGaXhlcyIsIllBSE9PIiwiZXh0ZW5kIiwiQ1N0dWRpb0Zvcm1GaWVsZCIsImdldExhYmVsIiwiX3JlbmRlclJlYWN0Q29tcG9uZW50Iiwib2JqIiwiaW5zdHJ1bWVudFRpbWVyIiwic2V0SW50ZXJ2YWwiLCIkIiwiaW5wdXRFbHMiLCJmaW5kIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsImJ1dHRvbkVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwic3R5bGUiLCJwYXJlbnRFbCIsIm9uY2xpY2siLCJfdGhpcyIsInN1YmplY3QiLCJwcm9tcHQiLCJhcGkiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsImZldGNoIiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInJlc3VsdCIsInRleHQiLCJyZXBsYWNlQWxsIiwiYXBwZW5kQ2hpbGQiLCJjbGVhckludGVydmFsIiwicmVuZGVyIiwiY29uZmlnIiwiY29udGFpbmVyRWwiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZ2V0TmFtZSIsImdldFN1cHBvcnRlZFByb3BlcnRpZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsImdldFN1cHBvcnRlZFBvc3RGaXhlcyIsIkNTdHVkaW9BdXRob3JpbmciLCJNb2R1bGUiLCJtb2R1bGVMb2FkZWQiXSwibWFwcGluZ3MiOiI7OztFQUVBLENBQUMsWUFBWTtFQUNYLEVBQVlBLGNBQWMsQ0FBQ0MsTUFBSztFQUNoQyxFQUFlRCxjQUFjLENBQUNFLFNBQVE7RUFDdEMsRUFBMkJGLGNBQWMsQ0FBQ0csVUFBVSxDQUFDQyxxQkFBb0I7RUFDekUsRUFBb0JKLGNBQWMsQ0FBQ0csVUFBVSxDQUFDRSxjQUFhO0lBMkIzREMsWUFBWSxDQUFDQyxRQUFRLENBQUNDLE9BQU8sR0FBR0YsWUFBWSxDQUFDQyxRQUFRLENBQUNDLE9BQU8sSUFBSSxVQUFVQyxFQUFFLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxVQUFVLEVBQUVDLFdBQVcsRUFBRTtNQUNuSCxJQUFJLENBQUNGLEtBQUssR0FBR0EsS0FBSyxDQUFBO0VBQ2xCLElBQUEsSUFBSSxDQUFDQSxLQUFLLENBQUNHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUM5QixJQUFJLENBQUNDLE1BQU0sR0FBRyxFQUFFLENBQUE7TUFDaEIsSUFBSSxDQUFDSCxVQUFVLEdBQUdBLFVBQVUsQ0FBQTtNQUM1QixJQUFJLENBQUNDLFdBQVcsR0FBR0EsV0FBVyxDQUFBO01BQzlCLElBQUksQ0FBQ0csT0FBTyxHQUFHLElBQUksQ0FBQTtNQUNuQixJQUFJLENBQUNDLE9BQU8sR0FBRyxJQUFJLENBQUE7TUFDbkIsSUFBSSxDQUFDQyxRQUFRLEdBQUcsS0FBSyxDQUFBO01BQ3JCLElBQUksQ0FBQ0MsS0FBSyxHQUFHLFVBQVUsQ0FBQTtNQUN2QixJQUFJLENBQUNULElBQUksR0FBR0EsSUFBSSxDQUFBO01BQ2hCLElBQUksQ0FBQ0QsRUFBRSxHQUFHQSxFQUFFLENBQUE7RUFDWixJQUFBLElBQUksQ0FBQ1cs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
