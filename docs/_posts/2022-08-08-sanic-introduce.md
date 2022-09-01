---
title: Sanic - 輕量快速的 Python Web Framework
tags:
- sanic
- web
- python
- framework
- programing
excerpt: 一款支援非同步調用不阻塞執行緒、編寫風格簡潔不拖泥帶水、內置高效率伺服器方便部署的 Python 框架，適合用於快速開發中小型專案。
---

Sanic 是一款 Python 的 Web 框架，編寫風格繼承了老牌框架 Flask 的簡潔並在其之上添加 async / await 的非同步調用支援，外加內建快速高效的 HTTP Server，提供了開箱即用、快速開發、生產部署的解決方案。

> **Sanic**<br/>
> 官方網站： [點我進入](https://sanic.dev/)<br/>

**安裝方式：**
```bash
pip install sanic
```


## 框架特性

- 使用 Python 3.8 以上的版本（推薦直接使用 Python 3.10）
- 支援 async / await 非同步特性（執行 IO 操作時不會阻塞）
- 內建快速的 HTTP Server 
- 類 Flask 的簡潔架構，易於擴充與編寫。

> 編寫這邊文章時使用的版本為 **22.6.1**，通常使用最新的版本即可。

## 建立基本結構

啟動 Sanic  的方式有以下兩種：
- 透過腳本運行 -> 在編寫腳本中使用 `Sanic.run()` 運行。
- 使用 CLI -> 使用 `Sanic CLI` 將 application 作為 module 導入(**推薦**) 

### 透過 app.run() 運行

在根目錄中建立 app.py ，並建立 Sanic instance，透過 app.run 運行伺服器。

```python
from sanic import Sanic

# create sanic app
app = Sanic(__name__)

if __name__ == '__main__':
		# 透過 app.run 運行
    app.run(host="0.0.0.0", debug=True)
```

### 透過 CLI 運行(推薦)

 建立以下資料夾結構，當資料夾內有 `__init__.py` 檔案時，該資料夾就會被 python 視為 pacakge。

```txt
/
├─ sanicapp
│   └─  __init__.py
└─ run.sh
```

-  `__init__.py`  中建立 Sanic Instance 。

```python
from sanic import Sanic

# create sanic app
app = Sanic(__name__)

# __name__ 可改為自定義 App 名稱
```


- 最後使用以下 shell 指令執行 sanic 伺服器。
```bash
sanic sanicapp:app -H 0.0.0.0 -p 8080 -d
```

- `sanicapp`為 package 的名稱，`app` 為 instance 變量。
- `-H` 用於指定 Host Address (預設為 127.0.0.1)
- `-p` 用於指定 Port (預設為 8000)
- `-d` 用於開啟 Debug 模式（會自動重載及看到更詳細的 log）
- `-w` 用於指定要啟動幾個 worker 
- 可透過 `-h` 參數觀看詳細的說明

使用 CLI 運行 Sanic 伺服器可以在運行環境配置上獲得更多的彈性。當需要改變 host 或是 debug mode 時，可以直接變更參數，不需要修改腳本的 app.run 的參數。

## Handler

Handler 是處理 Request 的基本單元，**至少會收到一個 Reqeust 物件並 return 一個 HTTPResponse** 。

- Request.headers ->  取得夾帶在 request header 的資料。
- Request.args  or Request.query_args -> 取得 URLQueryParams
- Request.body -> 取得發出 POST Request 時夾帶在 body 欄位的內容。
	- 取得的資料為純 bytes 需要轉譯。
- Request.json -> 當 content_type 為 "application/json" 時，會自動將 body 中的內容轉為 Python Dictionary

```python
import asyncio
import asyncio
import time
from sanic import Sanic, HTTPResponse, Request, response

app = Sanic(__name__)

@app.get("/typed")
def typed(request: Request) -> HTTPResponse:
    """
    get Done(sync)
	
    :param reuqest [sanic.Request]
    """
    time.sleep(1)
    return response.text("Done")


@app.get("/async_typed/<tag>")
async def async_typed(request: Request, tag: str) -> HTTPResponse:
    """
    get Done(async)
	
    :param reuqest [sanic.Request]
    """
    await asyncio.sleep(1)
    return response.text("Done")
```

對應官方文檔： https://sanic.dev/en/guide/basics/handlers.html#a-word-about-async

> 實務上應該盡量使用 async / await 以避免執行緒阻塞，執行上會更有效率。


## Routing

Routing 用於將 Handler 註冊至對應的 URL，當伺服器接收到對應路由時，會將收到的資料轉換成 Request 並執行對應的 Handler。

註冊 Routing 的方式有三種：
- 透過 app.add_route() 
- 透過 @app.route / @app.get 等裝飾器
- Blueporint

```python
from sanic import Sanic, HTTPResponse, Request, response

app = Sanic(__name__)

def typed(request: Request) -> HTTPResponse:
    """
    get Done(sync)
	
    :param reuqest [sanic.Request]
    """
    return response.text("Done")

# register route by decorator
@app.get("/async_typed/<tag>")
async def async_typed(request: Request, tag: str) -> HTTPResponse:
    """
    get Done(async)
	
    :param reuqest [sanic.Request]
    """
    return response.text("Done")

# register route by add_route()
app.add_route(typed, "/typed", methods=["GET"])
```
`@app.get()` 等裝飾器只是 `app.add_route()` 的封裝，用於增加可讀性。

### Blueprint

儘管能夠透過 `app.add_route()` 註冊路由，但這會導致所有 handler 必須依賴於 Sanic instance，當需要設置的路由數量增加時會很不方便，此時可採用 blueprint 方案。

- **view.py**

```python
from sanic import Blueprint, HTTPResponse, Request, response

bp = Blueprint("peon")

def typed(request: Request) -> HTTPResponse:
    """
    get Done(sync)
	
    :param reuqest [sanic.Request]
    """
    return response.text("Done")

# register route by decorator
@bp.get("/async_typed/<tag>")
async def async_typed(request: Request, tag: str) -> HTTPResponse:
    """
    get Done(async)
	
    :param reuqest [sanic.Request]
    """
    return response.text("Done")

# Blueprint 的 route 註冊方式與使用 app.add_route 相同。
bp.add_route(typed, "/typed", methods=["GET"])
```

- **app.py**

```python
from sanic import Sanic, HTTPResponse, Request, response
from .view import bp

app = Sanic(__name__)

# 使用 app.blueprint 將 blueprint instance 註冊進 app 路由。
app.blueprint(bp)
```

使用 Blueprint 可以將 Route 與 Handle 與 Sanic instance 分離開來，達到關注點分離的效果。

## App Registry

當建立 Sanic instance 時，會將該 instance 寫入 Sanic 內部的註冊表中，可以透過 `Sanic.get_app()` 取得 app 的 instance。

- **app.py**
```python
from sanic import Sanic

app = Sanic("my_server")
```

- **db.py**

```python
from sanic import Sanic

app = Sanic.get_app("my_server")
```

若建立的 instance 只有一個時，也可以不用填入 instance name，直接使用 `Sanic.get_app()` 就能取得 instance 。

## App Context

App Context （中文翻譯稱作上下文）用於附加希望**能夠重複使用的 instance** ，像是與資料庫的連接 、定期運作的排程器等。

- **app.py**

```python
from sanic import Sanic, HTTPResponse, Request, response
from .view import bp
from . import scheduler

app = Sanic(__name__)

# lifecycle hook - 在 server 運行之前將 instance 註冊進 context.
@app.before_server_start
async def startup(app: Sanic):
    scheduler.setup(app)

app.blueprint(bp)
```

- **scheduler.py**

```python
from sanic import Sanic

from .struct import AppScheduler

SERVICE_CODE = "app_scheduler"

def get() -> AppScheduler:
    app = Sanic.get_app()
    # 使用 getattr 取得 app.ctx 中的 instance
    return getattr(app.ctx, SERVICE_CODE)

def setup(app: Sanic) -> AppScheduler:
    app = Sanic.get_app()
    scheduler = AppScheduler(app)
    # 使用 setattr 將 instance 寫入 app.ctx
    setattr(app.ctx, SERVICE_CODE, scheduler)
    return scheduler

```

- **view.py**
```python
from sanic import Blueprint, HTTPResponse, Request, response
from . import scheduler

bp = Blueprint("peon")

@bp.get("/")
def typed(request: Request) -> HTTPResponse:
    """
    get Done(sync)
	
    :param reuqest [sanic.Request]
    """
    _scheudler = scheduler.get()
    return response.text("Done")
```

範例中使用 `@app.before_server_start` 在運行之前將 AppScheduler 嵌入 app.ctx 內。 並在 handler 中過 `scheduler.get()` 將其從 app.ctx 中取出，藉此重複利用 instance。

## Listener (LifeCycle)

Sanic 包含 8 個 Hook：

**只在 sanic app 建立/停止時執行一次:**
- main_process_start
- main_process_stop

**每個 worker 都會執行一次**
- before_server_start
- after_server_start
- before_server_stop
- after_server_stop

**當 auto_reload 被開啟時，每次 reload 就會執行一次**
- reload_process_start
- reload_process_stop

```python
@app.reload_process_start
async def reload_start(*_):
    print(">>>>>> reload_start <<<<<<")


@app.main_process_start
async def main_start(*_):
    print(">>>>>> main_start <<<<<<")

```

-  `main_process_start` 經常用於初始化僅能初始化一次的時候（設置遠端的 webhook)
-  `before_server_start` 及 `after_server_start` 常用於建立可重複使用的 instance 並且附加至 app.ctx 作為常駐 service 使用。
-  `before_server_stop` 用於關閉各 service 的連接並清除資料。

## 應用範例

> **Sanic Example**<br/>
> Github: [點我進入](https://github.com/tassis/sanic-example)


## TL;DR

- Sanic 是 Python 3.8 版本以上的輕量 Web 框架，支援 async / await 的非同步特性。
- 推薦使用 Sanic CLI 運行 Server ，在環境配置上有更多的彈性。
- Handler 是處理 Request 的基本單元，會**至少接收一個 Request 物件並返回 HttpResponse 物件**。
- 應該**盡量使用 async / await** 處理 handler 邏輯，避免執行緒阻塞、增加運作效率。
- Routing 用於**將路由與 Handler 進行綁定**，當 Server 接收到指定的路徑時，會將資料打包成 Request 送至對應的 Handler。
- App Context 用於**存放希望重複使用的 instance**，像是資料庫連接、排程器等。