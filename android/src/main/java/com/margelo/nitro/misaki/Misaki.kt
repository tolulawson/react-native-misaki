package com.margelo.nitro.misaki
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class Misaki : HybridMisakiSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
