
#ifndef META_INFO_OBJECT_H
#define META_INFO_OBJECT_H
#include <any>
#include <nlohmann/json.hpp>
#include <string>
#include <variant>
#include <vector>
using json = nlohmann::json;
#include "joint_info.hpp"
#include "meta_info_signal.hpp"
namespace asyncapi_client {
struct meta_info_object {
    asyncapi_client::meta_info_signal signal;
    std::string name;
    std::vector<asyncapi_client::joint_info> joints;

    static meta_info_object from_json_string(std::string json_string)
    {
        json json_obj = json::parse(json_string);

        meta_info_object result = meta_info_object();
        if (json_obj.contains("signal")) {
            json_obj.at("signal").get_to(result.signal);
        }
        if (json_obj.contains("name")) {
            json_obj.at("name").get_to(result.name);
        }
        if (json_obj.contains("joints")) {
            json_obj.at("joints").get_to(result.joints);
        }
        return result;
    }

    static std::string to_json_string(meta_info_object meta_info_object)
    {
        json json_obj = meta_info_object;
        return json_obj.dump();
    }

    NLOHMANN_DEFINE_TYPE_INTRUSIVE_WITH_DEFAULT(meta_info_object, signal, name, joints)
};

}
#endif
