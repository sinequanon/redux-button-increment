export default {
     entry : './index',
     output : {
          filename : 'index.bundle.js'
     },
     module : {
          loaders : [
               {
                    test : /\.jsx?$/,
                    loader : 'babel?presets[]=es2015&presets[]=react'
               }
          ]
     }

}
