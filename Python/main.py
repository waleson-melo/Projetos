import requests


def send_sms(telephone_number, message):
    url = 'https://api.zenvia.com/v2/channels/sms/messages'
    payload = {
        "from": "spotless-bookcase",
        "to": telephone_number,
        "contents": [{
            "type": "text",
            "text": message
        }]
    }
    headers = {
        'Content-Type': 'application/json',
        'X-API-TOKEN': 'TOKEN'
    }

    return requests.post(url=url, headers=headers, json=payload)


if __name__ == '__main__':
    response = send_sms("XXXXXXXXXXX", "Olá, meu nome  é Waleson Melo e estou participando do Talent LAB Itacoatiara(Nível Superior)")

    print(response.text)
