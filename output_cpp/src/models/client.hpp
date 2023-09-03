
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
        result.id = json_obj['id'].get<std::string>();
        return result;
    }
};
NLOHMANN_DEFINE_TYPE_NON_INTRUSIVE(client, id)

}
#endif
