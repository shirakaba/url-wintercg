#include "url_wintercg.h"
#include "../lib/ada/ada.h"

using namespace Napi;

UrlWintercg::UrlWintercg(const Napi::CallbackInfo& info) : ObjectWrap(info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return;
  }

  if (!info[0].IsString()) {
    Napi::TypeError::New(env, "You need to name yourself")
        .ThrowAsJavaScriptException();
    return;
  }

  this->_greeterName = info[0].As<Napi::String>().Utf8Value();
}

Napi::Value UrlWintercg::Greet(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  auto url = ada::parse<ada::url>("https://www.google.com");
  if (!url) {
    Napi::TypeError::New(env, "Failed to construct URL")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  printf("Constructed URL! %s\n", url->get_href().c_str());

  if (info.Length() < 1) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsString()) {
    Napi::TypeError::New(env, "You need to introduce yourself to greet")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  Napi::String name = info[0].As<Napi::String>();

  printf("Hello %s\n", name.Utf8Value().c_str());
  printf("I am %s\n", this->_greeterName.c_str());

  return Napi::String::New(env, this->_greeterName);
}

Napi::Function UrlWintercg::GetClass(Napi::Env env) {
  return DefineClass(
      env,
      "UrlWintercg",
      {
          UrlWintercg::InstanceMethod("greet", &UrlWintercg::Greet),
      });
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  Napi::String name = Napi::String::New(env, "UrlWintercg");
  exports.Set(name, UrlWintercg::GetClass(env));
  return exports;
}

NODE_API_MODULE(addon, Init)
