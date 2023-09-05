
#ifndef JOINT_INFO_H
#define JOINT_INFO_H
#include <nlohmann/json.hpp>
using json = nlohmann::json;

namespace asyncapi_client {
struct joint_info {
    int minimum;
    int maximum;

    static joint_info from_json_string(std::string json_string)
    {
        json json_obj = json::parse(json_string);

        joint_info result = joint_info();
        if (json_obj.contains("minimum")) {
            json_obj.at("minimum").get_to(result.minimum);
        }
        if (json_obj.contains("maximum")) {
            json_obj.at("maximum").get_to(result.maximum);
        }
        return result;
    }

    static std::string to_json_string(joint_info joint_info)
    {
        json json_obj = joint_info;
        return json_obj.dump();
    }

    NLOHMANN_DEFINE_TYPE_INTRUSIVE_WITH_DEFAULT(joint_info, minimum, maximum)
};

}
#endif
