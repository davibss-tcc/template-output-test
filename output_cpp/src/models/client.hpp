
#ifndef CLIENT_H
#define CLIENT_H
#include <nlohmann/json.hpp>
#include <string>
using json = nlohmann::json;

namespace asyncapi_client {
struct client {
    std::string id;

    static client from_json_string(std::string json_string)
    {
        json json_obj = json::parse(json_string);

        client result = client();
        if (json_obj.contains("id")) {
            json_obj.at("id").get_to(result.id);
        }
        return result;
    }
};
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(client, id)

}
#endif
