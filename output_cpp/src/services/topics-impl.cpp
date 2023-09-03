
#include "mosquitto.h"
#include "topics.cpp"
#include <iostream>

class TopicsLayerImpl : public TopicsLayer {
public:
    std::string METAINFO_TOPIC = "metainfo";
    std::string EDSCORBOT_COMMANDS_TOPIC = "EDScorbot/commands";
    std::string EDSCORBOT_MOVED_TOPIC = "EDScorbot/moved";

    void subscribe_all_topics()
    {
        mosquitto_subscribe(mosq, NULL, METAINFO_TOPIC.c_str(), 0);
        mosquitto_subscribe(mosq, NULL, EDSCORBOT_COMMANDS_TOPIC.c_str(), 0);
        mosquitto_subscribe(mosq, NULL, EDSCORBOT_MOVED_TOPIC.c_str(), 0);

        std::cout << "Subscribed on topics: " << std::endl
                  << "  " + METAINFO_TOPIC << std::endl
                  << "  " + EDSCORBOT_COMMANDS_TOPIC << std::endl
                  << "  " + EDSCORBOT_MOVED_TOPIC << std::endl;
    }
};

TopicsLayerImpl topicsImpl;
