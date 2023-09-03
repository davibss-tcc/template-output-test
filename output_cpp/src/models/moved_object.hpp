
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
        if (json_obj.contains("client")) {
            json_obj.at("client").get_to(result.client);
        }
        if (json_obj.contains("error")) {
            json_obj.at("error").get_to(result.error);
        }
        if (json_obj.contains("content")) {
            json_obj.at("content").get_to(result.content);
        }
        return result;
    }
};
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(moved_object, client, error, content)

}
#endif
