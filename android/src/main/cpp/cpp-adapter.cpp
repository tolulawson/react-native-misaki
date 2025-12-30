#include <jni.h>
#include "misakiOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::rnmisaki::initialize(vm);
}
