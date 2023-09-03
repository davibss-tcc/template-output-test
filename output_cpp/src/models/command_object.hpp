
#ifndef COMMAND_OBJECT_H
#define COMMAND_OBJECT_H
#include <any>
#include <nlohmann/json.hpp>
#include <string>
#include <variant>
#include <vector>
using json = nlohmann::json;
#include "client.hpp"
#include "command_signal.hpp"
namespace asyncapi_client {
struct command_object {
    asyncapi_client::command_signal signal;
    asyncapi_client::client client;
    bool error;
    std::vector<int> point;
    std::vector<std::vector<int>> trajectory;

    static command_object from_json_string(std::string json_string)
    {
        json json_obj = json::parse(json_string);

        command_object result = command_object();
        if (json_obj.contains("signal")) {
            json_obj.at("signal").get_to(result.signal);
        }
        if (json_obj.contains("client")) {
            json_obj.at("client").get_to(result.client);
        }
        if (json_obj.contains("error")) {
            json_obj.at("error").get_to(result.error);
        }
        if (json_obj.contains("point")) {
            json_obj.at("point").get_to(result.point);
        }
        if (json_obj.contains("trajectory")) {
            json_obj.at("trajectory").get_to(result.trajectory);
        }
        return result;
    }
};
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(command_object, signal, client, error, point, trajectory)

}
#endif
