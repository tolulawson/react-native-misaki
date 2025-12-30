package com.margelo.nitro.rnmisaki

import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class RNMisaki : HybridRNMisakiSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
