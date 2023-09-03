
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
        result.signal = json_obj['signal'].get<asyncapi_client::command_signal>();
        result.client = json_obj['client'].get<asyncapi_client::client>();
        result.error = json_obj['error'].get<bool>();
        result.point = json_obj['point'].get<std::vector<int>>();
        result.trajectory = json_obj['trajectory'].get<std::vector<std::vector<int>>>();
        return result;
    }
};
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(command_object, signal, client, error, point, trajectory)

}
#endif
