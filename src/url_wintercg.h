#pragma once

#include <napi.h>

class UrlWintercg : public Napi::ObjectWrap<UrlWintercg> {
 public:
  UrlWintercg(const Napi::CallbackInfo&);
  Napi::Value Greet(const Napi::CallbackInfo&);

  static Napi::Function GetClass(Napi::Env);

 private:
  std::string _greeterName;
};
