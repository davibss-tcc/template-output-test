
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
        result.signal = json_obj['signal'].get<asyncapi_client::meta_info_signal>();
        result.name = json_obj['name'].get<std::string>();
        result.joints = json_obj['joints'].get<std::vector<asyncapi_client::joint_info>>();
        return result;
    }
};
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(meta_info_object, signal, name, joints)

}
#endif
