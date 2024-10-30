(function () {
  var $field = u("#id_file");
  $field.attr("accept", ".kml, .kmz");
  $field.on("change", async function () {
    if (this.files.length > 0 && this.files[0].size > 2 * 1e7) {
      swal({
        title: "Error!",
        text: "File is too big!",
        type: "error",
        confirmButtonText: "OK",
      });
      this.value = "";
      u(this).removeClass("is-valid");
      return;
    }
    if (this.files.length > 0) {
      let kml;
      let zip;
      try {
        zip = await JSZip.loadAsync(this.files[0]);
      } catch {
        kml = await this.files[0].text();
      }
      if (!kml && zip && zip.files && zip.files["doc.kml"]) {
        kml = await zip.file("doc.kml").async("string");
      }
      if (!kml) {
        swal({
          title: "Error!",
          text: "Invalid file!",
          type: "error",
          confirmButtonText: "OK",
        });
        this.value = "";
        u(this).removeClass("is-valid");
        return;
      }
      let parsedText;
      try {
        const parser = new DOMParser();
        parsedText = parser.parseFromString(kml, "text/xml");
        const errorNode = parsedText.querySelector("parsererror");
        if (errorNode) {
          console.log(errorNode);
          throw Error(errorNode);
        }
      } catch {
        swal({
          title: "Error!",
          text: "Could not parse XML data!",
          type: "error",
          confirmButtonText: "OK",
        });
        this.value = "";
        u(this).removeClass("is-valid");
        return;
      }
      const nLayers = parsedText.getElementsByTagName("GroundOverlay").length;
      if (nLayers === 0) {
        swal({
          title: "Error!",
          text: "Couldn't find maps in this file!",
          type: "error",
          confirmButtonText: "OK",
        });
        this.value = "";
        u(this).removeClass("is-valid");
        return;
      } else {
        u(this).addClass("is-valid");
      }
    }
  });
})();
