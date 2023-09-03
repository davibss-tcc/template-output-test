
#include "../models/command_object.hpp"
#include "../models/meta_info_object.hpp"
#include "../models/moved_object.hpp"
#include "communication-layer.cpp"
#include "topics-impl.cpp"
using namespace asyncapi_client;

class CommunicationLayerImpl : public CommunicationLayer {
public:
    void handle_metainfo_topic(const struct mosquitto_message* message)
    {
        // TODO implement your business code

        if ((char*)message->payload != NULL) {
            try {
                meta_info_object obj = meta_info_object::from_json_string((char*)message->payload);
                // TODO implement your business code
                std::cout << "handle_metainfo_topic" << std::endl;
            } catch (std::exception& e) {
                std::cout << "Unable to build CommandObject from message (metainfo_topic): " << (char*)message->payload << std::endl;
            }
        } else {
            std::cout << "message received on metainfo_topic has no payload" << std::endl;
        }
    }

    void handle_edscorbot_commands_topic(const struct mosquitto_message* message)
    {
        // TODO implement your business code

        if ((char*)message->payload != NULL) {
            try {
                command_object obj = command_object::from_json_string((char*)message->payload);
                // TODO implement your business code
                std::cout << "handle_edscorbot_commands_topic" << std::endl;
            } catch (std::exception& e) {
                std::cout << "Unable to build CommandObject from message (edscorbot_commands_topic): " << (char*)message->payload << std::endl;
            }
        } else {
            std::cout << "message received on edscorbot_commands_topic has no payload" << std::endl;
        }
    }

    void handle_edscorbot_moved_topic(const struct mosquitto_message* message)
    {
        // TODO implement your business code

        if ((char*)message->payload != NULL) {
            try {
                moved_object obj = moved_object::from_json_string((char*)message->payload);
                // TODO implement your business code
                std::cout << "handle_edscorbot_moved_topic" << std::endl;
            } catch (std::exception& e) {
                std::cout << "Unable to build CommandObject from message (edscorbot_moved_topic): " << (char*)message->payload << std::endl;
            }
        } else {
            std::cout << "message received on edscorbot_moved_topic has no payload" << std::endl;
        }
    }
};

CommunicationLayerImpl impl;

void message_callback(struct mosquitto* mosq, void* obj, const struct mosquitto_message* message)
{

    if (std::strcmp(message->topic, topicsImpl.METAINFO_TOPIC.c_str()) == 0) {
        impl.handle_metainfo_topic(message);
    }

    if (std::strcmp(message->topic, topicsImpl.EDSCORBOT_COMMANDS_TOPIC.c_str()) == 0) {
        impl.handle_edscorbot_commands_topic(message);
    }

    if (std::strcmp(message->topic, topicsImpl.EDSCORBOT_MOVED_TOPIC.c_str()) == 0) {
        impl.handle_edscorbot_moved_topic(message);
    }
}
