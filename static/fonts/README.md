# Workflow for importing Webfont kits from fontsquirrel

- Go to the [fontsquirrel website](https://www.fontsquirrel.com)
- Find a font, then download its Webfont kit (e.g. [Roboto](https://www.fontsquirrel.com/fonts/roboto?q%5Bterm%5D=roboto&q%5Bsearch_check%5D=Y))
- Extract it in a subfolder of /static/fonts, e.g. to `static/fonts/roboto-fontfacekit`
- Collect all the individual stylesheets into a single file and flatten the file structure:
- Adjust the generated `stylesheet.css`
- Import the final stylesheet in your own stylesheet: `@import "~static/fonts/roboto-fontfacekit/stylesheet.css";`

## Example

### Collecting and cleaning up files

#### Manually

The manual process would be:

- Move into the unpacked fontkit folder `cd static/fonts/roboto-fontfacekit`
- Collect stylesheets `find . -type f -name 'stylesheet.css' -exec cat {} + > ./stylesheet.css`
- Collect woff files: `mv ./web\ fonts/**/*.woff ./`
- Delete the rest: `rm -rf ./web\ fonts/ && rm ./How_to_use_webfonts.html`

#### Via bash script

First, copy and paste the `import_font_squirrel` script into your bash so it will be available.
Then, from the project root, use the script by passing it the path to the new fonts folder, e.g. `import_font_squirrel static/fonts/roboto-fontfacekit`

Then, use auto-completion to quickly finish the job:

- Type `impo`, hit TAB -> `import_font_squirrel`
- Hit space for an actual space
- Type `sta`, hit TAB -> `static/`
- Type `fo`, hit TAB -> `static/fonts/`
- Type `ro`, hit TAB -> `static/fonts/roboto-fontfacekit`
- Hit ENTER

```bash
import_font_squirrel() {
  cd $1

  echo "merge stylesheets"
  find . -type f -name 'stylesheet.css' -exec cat {} + > ./stylesheet.css

  echo "move font files"
  mv ./web\ fonts/**/*.woff ./

  echo "clean up"
  rm -rf ./web\ fonts/
  rm ./How_to_use_webfonts.html
  echo "done!"
}
```

### Adjusting the generated `stylesheet.css`

Edit the file in which you concatinated the individual stylesheets

- Drop any formats except `woff`
- Single `font-family` for all variants
- A variants to match the filename

#### Before adjustment

File structure:

```
./roboto-fontfacekit
./roboto-fontfacekit/Apache License.txt
./roboto-fontfacekit/How_to_use_webfonts.html
./roboto-fontfacekit/web fonts
./roboto-fontfacekit/web fonts/roboto_blackitalic_macroman
./roboto-fontfacekit/web fonts/roboto_blackitalic_macroman/Roboto-BlackItalic-demo.html
./roboto-fontfacekit/web fonts/roboto_blackitalic_macroman/Roboto-BlackItalic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_blackitalic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_blackitalic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_blackitalic_macroman/specimen_files/Roboto-BlackItalic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_blackitalic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_blackitalic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_black_macroman
./roboto-fontfacekit/web fonts/roboto_black_macroman/Roboto-Black-demo.html
./roboto-fontfacekit/web fonts/roboto_black_macroman/Roboto-Black-webfont.woff
./roboto-fontfacekit/web fonts/roboto_black_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_black_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_black_macroman/specimen_files/Roboto-Black-cleartype.png
./roboto-fontfacekit/web fonts/roboto_black_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_black_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_boldcondenseditalic_macroman
./roboto-fontfacekit/web fonts/roboto_boldcondenseditalic_macroman/RobotoCondensed-BoldItalic-demo.html
./roboto-fontfacekit/web fonts/roboto_boldcondenseditalic_macroman/RobotoCondensed-BoldItalic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_boldcondenseditalic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_boldcondenseditalic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_boldcondenseditalic_macroman/specimen_files/RobotoCondensed-BoldItalic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_boldcondenseditalic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_boldcondenseditalic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_boldcondensed_macroman
./roboto-fontfacekit/web fonts/roboto_boldcondensed_macroman/RobotoCondensed-Bold-demo.html
./roboto-fontfacekit/web fonts/roboto_boldcondensed_macroman/RobotoCondensed-Bold-webfont.woff
./roboto-fontfacekit/web fonts/roboto_boldcondensed_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_boldcondensed_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_boldcondensed_macroman/specimen_files/RobotoCondensed-Bold-cleartype.png
./roboto-fontfacekit/web fonts/roboto_boldcondensed_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_boldcondensed_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_bolditalic_macroman
./roboto-fontfacekit/web fonts/roboto_bolditalic_macroman/Roboto-BoldItalic-demo.html
./roboto-fontfacekit/web fonts/roboto_bolditalic_macroman/Roboto-BoldItalic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_bolditalic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_bolditalic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_bolditalic_macroman/specimen_files/Roboto-BoldItalic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_bolditalic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_bolditalic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_bold_macroman
./roboto-fontfacekit/web fonts/roboto_bold_macroman/Roboto-Bold-demo.html
./roboto-fontfacekit/web fonts/roboto_bold_macroman/Roboto-Bold-webfont.woff
./roboto-fontfacekit/web fonts/roboto_bold_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_bold_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_bold_macroman/specimen_files/Roboto-Bold-cleartype.png
./roboto-fontfacekit/web fonts/roboto_bold_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_bold_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_condenseditalic_macroman
./roboto-fontfacekit/web fonts/roboto_condenseditalic_macroman/RobotoCondensed-Italic-demo.html
./roboto-fontfacekit/web fonts/roboto_condenseditalic_macroman/RobotoCondensed-Italic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_condenseditalic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_condenseditalic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_condenseditalic_macroman/specimen_files/RobotoCondensed-Italic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_condenseditalic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_condenseditalic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_condensed_macroman
./roboto-fontfacekit/web fonts/roboto_condensed_macroman/RobotoCondensed-Regular-demo.html
./roboto-fontfacekit/web fonts/roboto_condensed_macroman/RobotoCondensed-Regular-webfont.woff
./roboto-fontfacekit/web fonts/roboto_condensed_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_condensed_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_condensed_macroman/specimen_files/RobotoCondensed-Regular-cleartype.png
./roboto-fontfacekit/web fonts/roboto_condensed_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_condensed_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_italic_macroman
./roboto-fontfacekit/web fonts/roboto_italic_macroman/Roboto-Italic-demo.html
./roboto-fontfacekit/web fonts/roboto_italic_macroman/Roboto-Italic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_italic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_italic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_italic_macroman/specimen_files/Roboto-Italic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_italic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_italic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_lightcondenseditalic_macroman
./roboto-fontfacekit/web fonts/roboto_lightcondenseditalic_macroman/RobotoCondensed-LightItalic-demo.html
./roboto-fontfacekit/web fonts/roboto_lightcondenseditalic_macroman/RobotoCondensed-LightItalic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_lightcondenseditalic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_lightcondenseditalic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_lightcondenseditalic_macroman/specimen_files/RobotoCondensed-LightItalic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_lightcondenseditalic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_lightcondenseditalic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_lightcondensed_macroman
./roboto-fontfacekit/web fonts/roboto_lightcondensed_macroman/RobotoCondensed-Light-demo.html
./roboto-fontfacekit/web fonts/roboto_lightcondensed_macroman/RobotoCondensed-Light-webfont.woff
./roboto-fontfacekit/web fonts/roboto_lightcondensed_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_lightcondensed_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_lightcondensed_macroman/specimen_files/RobotoCondensed-Light-cleartype.png
./roboto-fontfacekit/web fonts/roboto_lightcondensed_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_lightcondensed_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_lightitalic_macroman
./roboto-fontfacekit/web fonts/roboto_lightitalic_macroman/Roboto-LightItalic-demo.html
./roboto-fontfacekit/web fonts/roboto_lightitalic_macroman/Roboto-LightItalic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_lightitalic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_lightitalic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_lightitalic_macroman/specimen_files/Roboto-LightItalic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_lightitalic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_lightitalic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_light_macroman
./roboto-fontfacekit/web fonts/roboto_light_macroman/Roboto-Light-demo.html
./roboto-fontfacekit/web fonts/roboto_light_macroman/Roboto-Light-webfont.woff
./roboto-fontfacekit/web fonts/roboto_light_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_light_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_light_macroman/specimen_files/Roboto-Light-cleartype.png
./roboto-fontfacekit/web fonts/roboto_light_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_light_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_mediumitalic_macroman
./roboto-fontfacekit/web fonts/roboto_mediumitalic_macroman/Roboto-MediumItalic-demo.html
./roboto-fontfacekit/web fonts/roboto_mediumitalic_macroman/Roboto-MediumItalic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_mediumitalic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_mediumitalic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_mediumitalic_macroman/specimen_files/Roboto-MediumItalic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_mediumitalic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_mediumitalic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_medium_macroman
./roboto-fontfacekit/web fonts/roboto_medium_macroman/Roboto-Medium-demo.html
./roboto-fontfacekit/web fonts/roboto_medium_macroman/Roboto-Medium-webfont.woff
./roboto-fontfacekit/web fonts/roboto_medium_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_medium_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_medium_macroman/specimen_files/Roboto-Medium-cleartype.png
./roboto-fontfacekit/web fonts/roboto_medium_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_medium_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_regular_macroman
./roboto-fontfacekit/web fonts/roboto_regular_macroman/Roboto-Regular-demo.html
./roboto-fontfacekit/web fonts/roboto_regular_macroman/Roboto-Regular-webfont.woff
./roboto-fontfacekit/web fonts/roboto_regular_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_regular_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_regular_macroman/specimen_files/Roboto-Regular-cleartype.png
./roboto-fontfacekit/web fonts/roboto_regular_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_regular_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_thinitalic_macroman
./roboto-fontfacekit/web fonts/roboto_thinitalic_macroman/Roboto-ThinItalic-demo.html
./roboto-fontfacekit/web fonts/roboto_thinitalic_macroman/Roboto-ThinItalic-webfont.woff
./roboto-fontfacekit/web fonts/roboto_thinitalic_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_thinitalic_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_thinitalic_macroman/specimen_files/Roboto-ThinItalic-cleartype.png
./roboto-fontfacekit/web fonts/roboto_thinitalic_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_thinitalic_macroman/stylesheet.css
./roboto-fontfacekit/web fonts/roboto_thin_macroman
./roboto-fontfacekit/web fonts/roboto_thin_macroman/Roboto-Thin-demo.html
./roboto-fontfacekit/web fonts/roboto_thin_macroman/Roboto-Thin-webfont.woff
./roboto-fontfacekit/web fonts/roboto_thin_macroman/specimen_files
./roboto-fontfacekit/web fonts/roboto_thin_macroman/specimen_files/grid_12-825-55-15.css
./roboto-fontfacekit/web fonts/roboto_thin_macroman/specimen_files/Roboto-Thin-cleartype.png
./roboto-fontfacekit/web fonts/roboto_thin_macroman/specimen_files/specimen_stylesheet.css
./roboto-fontfacekit/web fonts/roboto_thin_macroman/stylesheet.css
```

Generated `stylesheet.css`:

```
@font-face {
    font-family: 'robotoblack_italic';
    src: url('Roboto-BlackItalic-webfont.eot');
    src: url('Roboto-BlackItalic-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-BlackItalic-webfont.woff2') format('woff2'),
         url('Roboto-BlackItalic-webfont.woff') format('woff'),
         url('Roboto-BlackItalic-webfont.ttf') format('truetype'),
         url('Roboto-BlackItalic-webfont.svg#robotoblack_italic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotoblack';
    src: url('Roboto-Black-webfont.eot');
    src: url('Roboto-Black-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-Black-webfont.woff2') format('woff2'),
         url('Roboto-Black-webfont.woff') format('woff'),
         url('Roboto-Black-webfont.ttf') format('truetype'),
         url('Roboto-Black-webfont.svg#robotoblack') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'roboto_condensedbold_italic';
    src: url('RobotoCondensed-BoldItalic-webfont.eot');
    src: url('RobotoCondensed-BoldItalic-webfont.eot?#iefix') format('embedded-opentype'),
         url('RobotoCondensed-BoldItalic-webfont.woff2') format('woff2'),
         url('RobotoCondensed-BoldItalic-webfont.woff') format('woff'),
         url('RobotoCondensed-BoldItalic-webfont.ttf') format('truetype'),
         url('RobotoCondensed-BoldItalic-webfont.svg#roboto_condensedbold_italic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'roboto_condensedbold';
    src: url('RobotoCondensed-Bold-webfont.eot');
    src: url('RobotoCondensed-Bold-webfont.eot?#iefix') format('embedded-opentype'),
         url('RobotoCondensed-Bold-webfont.woff2') format('woff2'),
         url('RobotoCondensed-Bold-webfont.woff') format('woff'),
         url('RobotoCondensed-Bold-webfont.ttf') format('truetype'),
         url('RobotoCondensed-Bold-webfont.svg#roboto_condensedbold') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotobold_italic';
    src: url('Roboto-BoldItalic-webfont.eot');
    src: url('Roboto-BoldItalic-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-BoldItalic-webfont.woff2') format('woff2'),
         url('Roboto-BoldItalic-webfont.woff') format('woff'),
         url('Roboto-BoldItalic-webfont.ttf') format('truetype'),
         url('Roboto-BoldItalic-webfont.svg#robotobold_italic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotobold';
    src: url('Roboto-Bold-webfont.eot');
    src: url('Roboto-Bold-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-Bold-webfont.woff2') format('woff2'),
         url('Roboto-Bold-webfont.woff') format('woff'),
         url('Roboto-Bold-webfont.ttf') format('truetype'),
         url('Roboto-Bold-webfont.svg#robotobold') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'roboto_condenseditalic';
    src: url('RobotoCondensed-Italic-webfont.eot');
    src: url('RobotoCondensed-Italic-webfont.eot?#iefix') format('embedded-opentype'),
         url('RobotoCondensed-Italic-webfont.woff2') format('woff2'),
         url('RobotoCondensed-Italic-webfont.woff') format('woff'),
         url('RobotoCondensed-Italic-webfont.ttf') format('truetype'),
         url('RobotoCondensed-Italic-webfont.svg#roboto_condenseditalic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'roboto_condensedregular';
    src: url('RobotoCondensed-Regular-webfont.eot');
    src: url('RobotoCondensed-Regular-webfont.eot?#iefix') format('embedded-opentype'),
         url('RobotoCondensed-Regular-webfont.woff2') format('woff2'),
         url('RobotoCondensed-Regular-webfont.woff') format('woff'),
         url('RobotoCondensed-Regular-webfont.ttf') format('truetype'),
         url('RobotoCondensed-Regular-webfont.svg#roboto_condensedregular') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotoitalic';
    src: url('Roboto-Italic-webfont.eot');
    src: url('Roboto-Italic-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-Italic-webfont.woff2') format('woff2'),
         url('Roboto-Italic-webfont.woff') format('woff'),
         url('Roboto-Italic-webfont.ttf') format('truetype'),
         url('Roboto-Italic-webfont.svg#robotoitalic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'roboto_condensedlight_italic';
    src: url('RobotoCondensed-LightItalic-webfont.eot');
    src: url('RobotoCondensed-LightItalic-webfont.eot?#iefix') format('embedded-opentype'),
         url('RobotoCondensed-LightItalic-webfont.woff2') format('woff2'),
         url('RobotoCondensed-LightItalic-webfont.woff') format('woff'),
         url('RobotoCondensed-LightItalic-webfont.ttf') format('truetype'),
         url('RobotoCondensed-LightItalic-webfont.svg#roboto_condensedlight_italic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'roboto_condensedlight';
    src: url('RobotoCondensed-Light-webfont.eot');
    src: url('RobotoCondensed-Light-webfont.eot?#iefix') format('embedded-opentype'),
         url('RobotoCondensed-Light-webfont.woff2') format('woff2'),
         url('RobotoCondensed-Light-webfont.woff') format('woff'),
         url('RobotoCondensed-Light-webfont.ttf') format('truetype'),
         url('RobotoCondensed-Light-webfont.svg#roboto_condensedlight') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotolight_italic';
    src: url('Roboto-LightItalic-webfont.eot');
    src: url('Roboto-LightItalic-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-LightItalic-webfont.woff2') format('woff2'),
         url('Roboto-LightItalic-webfont.woff') format('woff'),
         url('Roboto-LightItalic-webfont.ttf') format('truetype'),
         url('Roboto-LightItalic-webfont.svg#robotolight_italic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotolight';
    src: url('Roboto-Light-webfont.eot');
    src: url('Roboto-Light-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-Light-webfont.woff2') format('woff2'),
         url('Roboto-Light-webfont.woff') format('woff'),
         url('Roboto-Light-webfont.ttf') format('truetype'),
         url('Roboto-Light-webfont.svg#robotolight') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotomedium_italic';
    src: url('Roboto-MediumItalic-webfont.eot');
    src: url('Roboto-MediumItalic-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-MediumItalic-webfont.woff2') format('woff2'),
         url('Roboto-MediumItalic-webfont.woff') format('woff'),
         url('Roboto-MediumItalic-webfont.ttf') format('truetype'),
         url('Roboto-MediumItalic-webfont.svg#robotomedium_italic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotomedium';
    src: url('Roboto-Medium-webfont.eot');
    src: url('Roboto-Medium-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-Medium-webfont.woff2') format('woff2'),
         url('Roboto-Medium-webfont.woff') format('woff'),
         url('Roboto-Medium-webfont.ttf') format('truetype'),
         url('Roboto-Medium-webfont.svg#robotomedium') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotoregular';
    src: url('Roboto-Regular-webfont.eot');
    src: url('Roboto-Regular-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-Regular-webfont.woff2') format('woff2'),
         url('Roboto-Regular-webfont.woff') format('woff'),
         url('Roboto-Regular-webfont.ttf') format('truetype'),
         url('Roboto-Regular-webfont.svg#robotoregular') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotothin_italic';
    src: url('Roboto-ThinItalic-webfont.eot');
    src: url('Roboto-ThinItalic-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-ThinItalic-webfont.woff2') format('woff2'),
         url('Roboto-ThinItalic-webfont.woff') format('woff'),
         url('Roboto-ThinItalic-webfont.ttf') format('truetype'),
         url('Roboto-ThinItalic-webfont.svg#robotothin_italic') format('svg');
    font-weight: normal;
    font-style: normal;

}

@font-face {
    font-family: 'robotothin';
    src: url('Roboto-Thin-webfont.eot');
    src: url('Roboto-Thin-webfont.eot?#iefix') format('embedded-opentype'),
         url('Roboto-Thin-webfont.woff2') format('woff2'),
         url('Roboto-Thin-webfont.woff') format('woff'),
         url('Roboto-Thin-webfont.ttf') format('truetype'),
         url('Roboto-Thin-webfont.svg#robotothin') format('svg');
    font-weight: normal;
    font-style: normal;

}


```

#### After adjustment

File structure:

```
./roboto-fontfacekit
./roboto-fontfacekit/Apache License.txt
./roboto-fontfacekit/Roboto-Black-webfont.woff
./roboto-fontfacekit/Roboto-BlackItalic-webfont.woff
./roboto-fontfacekit/Roboto-Bold-webfont.woff
./roboto-fontfacekit/Roboto-BoldItalic-webfont.woff
./roboto-fontfacekit/Roboto-Italic-webfont.woff
./roboto-fontfacekit/Roboto-Light-webfont.woff
./roboto-fontfacekit/Roboto-LightItalic-webfont.woff
./roboto-fontfacekit/Roboto-Medium-webfont.woff
./roboto-fontfacekit/Roboto-MediumItalic-webfont.woff
./roboto-fontfacekit/Roboto-Regular-webfont.woff
./roboto-fontfacekit/Roboto-Thin-webfont.woff
./roboto-fontfacekit/Roboto-ThinItalic-webfont.woff
./roboto-fontfacekit/RobotoCondensed-Bold-webfont.woff
./roboto-fontfacekit/RobotoCondensed-BoldItalic-webfont.woff
./roboto-fontfacekit/RobotoCondensed-Italic-webfont.woff
./roboto-fontfacekit/RobotoCondensed-Light-webfont.woff
./roboto-fontfacekit/RobotoCondensed-LightItalic-webfont.woff
./roboto-fontfacekit/RobotoCondensed-Regular-webfont.woff
./roboto-fontfacekit/styles.css
```

Generated `stylesheet.css`:

```
@font-face {
  font-family: Roboto;
  src: url('Roboto-Black-webfont.woff') format('woff');
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-BlackItalic-webfont.woff') format('woff');
  font-weight: 900;
  font-style: italic;
  font-stretch: normal;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-Bold-webfont.woff') format('woff');
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
}

@font-face {
  font-family: Roboto;
  src: url('RobotoCondensed-Bold-webfont.woff') format('woff');
  font-weight: bold;
  font-style: normal;
  font-stretch: condensed;
}

@font-face {
  font-family: Roboto;
  src: url('RobotoCondensed-BoldItalic-webfont.woff') format('woff');
  font-weight: bold;
  font-style: italic;
  font-stretch: condensed;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-BoldItalic-webfont.woff') format('woff');
  font-weight: bold;
  font-style: italic;
  font-stretch: normal;
}

@font-face {
  font-family: Roboto;
  src: url('RobotoCondensed-Regular-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-stretch: condensed;
}

@font-face {
  font-family: Roboto;
  src: url('RobotoCondensed-Italic-webfont.woff') format('woff');
  font-weight: normal;
  font-style: italic;
  font-stretch: condensed;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-Italic-webfont.woff') format('woff');
  font-weight: normal;
  font-style: italic;
  font-stretch: normal;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-Light-webfont.woff') format('woff');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: Roboto;
  src: url('RobotoCondensed-Light-webfont.woff') format('woff');
  font-weight: 300;
  font-style: normal;
  font-stretch: condensed;
}

@font-face {
  font-family: Roboto;
  src: url('RobotoCondensed-LightItalic-webfont.woff') format('woff');
  font-weight: 300;
  font-style: italic;
  font-stretch: condensed;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-LightItalic-webfont.woff') format('woff');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-Medium-webfont.woff') format('woff');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-MediumItalic-webfont.woff') format('woff');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-Regular-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-Thin-webfont.woff') format('woff');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: Roboto;
  src: url('Roboto-ThinItalic-webfont.woff') format('woff');
  font-weight: 100;
  font-style: italic;
}

```
