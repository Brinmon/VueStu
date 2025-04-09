Vue开发依赖于Node.js环境，建议通过以下两种方式安装：
​​方式一（推荐）：使用nvm管理多版本
```
# 安装nvm（Node版本管理工具）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# 重启终端后安装最新Node.js LTS版本
nvm install --lts
nvm use --lts
```

安装Vue CLI脚手架​
```
# 全局安装Vue CLI
npm install -g @vue/cli
# 验证安装
vue --version  # 显示版本如@vue/cli 5.x[1,2,11](@ref)
```