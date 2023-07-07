AFRAME.registerComponent("Model", {
    init: async function () {

        //Get the compund details of the element
        var model = await this.getModel();
    
        var barcodes = model.keys(model);
    
        barcodes.map(barcode => {
          var element = model[barcode];
    
          //Call the function
          this.createModel(element);
        });
    
      },
      getModels: function () {
        return fetch("js/ModelList.json")
          .then(res => res.json())
          .then(data => data);
      },
      getElementColors: function () {
        return fetch("js/elementColors.json")
          .then(res => res.json())
          .then(data => data);
      },

      createModel: function(model){
        var barcodeValue = model.barcode_value
        var modelUrl = model.model_url
        var modelName = model.model_name 
        var scene = document.querySelector("a-scene")
        var marker = document.createElement("a-marker")

        marker.setAttribute("id",`marker-${modelName}`)
        marker.setAttribute("type","barcode")
        marker.setAttribute("Model_name", modelName)
        marker.setAttribute("value", barcodeValue)
        marker.setAttribute("markerhandler",{})
        scene.appendChild(marker)

        if(barcodeValue === 0){
            var modelEl = document.createElement("a-entity")
            modelEl.setAttribute("id",`${modelName}`)
            modelEl.setAttribute("geometry",{
                primitive : "box",
                width : model.width,
                height : model.height
            })
            modelEl.setAttribute("position",model.position)
            modelEl.setAttribute("rotation",model.rotation)
            modelEl.setAttribute("material",{
                color : model.color
            })
            modelEl.appendChild(modelEl)
        } else {
            var modelEl = document.createElement("a-entity")
            modelEl.setAttribute("id",`${modelName}`)
            modelEl.setAttribute("gltf-model",`url(${modelUrl})`)
            modelEl.setAttribute("scale",model.scale)
            modelEl.setAttribute("position",model.position)
            modelEl.setAttribute("rotation",model.rotation)
            marker.appendChild(modelEl)
        }

      }
})
  