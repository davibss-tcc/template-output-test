
#ifndef MOVED_OBJECT_H
#define MOVED_OBJECT_H
#include <any>
#include <nlohmann/json.hpp>
#include <string>
#include <variant>
#include <vector>
using json = nlohmann::json;
#include "client.hpp"
namespace asyncapi_client {
struct moved_object {
    asyncapi_client::client client;
    bool error;
    std::vector<int> content;

    static moved_object from_json_string(std::string json_string)
    {
        json json_obj = json::parse(json_string);

        moved_object result = moved_object();
        result.client = json_obj['client'].get<asyncapi_client::client>();
        result.error = json_obj['error'].get<bool>();
        result.content = json_obj['content'].get<std::vector<int>>();
        return result;
    }
};
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(moved_object, client, error, content)

}
#endif
