#Sharepoint - работа со списками через REST API (JavaScript)#

Данный образец демонстрирует отображение содержимого списка и отображение контента из него в таблице через Sharepoint REST API.

Функция "retreiveListData" рекурсивно получает все данные из списка и извлекает их каждого элемента списка необходимые поля, помещая их в массив.

Обращение в списку выполнено через API интерфейс, метод `lists(guid)/items`

```
http://example.ru/_api/web/lists(guid'41E4C036-7C64-4B05-86D8-207F6864CA10')/Items
```

`printSpecsInfoFormatted` выводит данные в виде HTML-таблицы

Запускать скрипт необходимо с параметром 

```
--user-data-dir="C:/Chrome dev session" --disable-web-security
```

чтобы включить возможность выполнения межсайтовых запросов ajax