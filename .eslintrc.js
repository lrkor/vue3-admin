module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        node: true,
        es6: true,
        browser: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/adjacent-overload-signatures': 'warn', //重载成员需要连续书写
        '@typescript-eslint/explicit-function-return-type': 'off', //需要具体制定函数或方法的返回值类型
        '@typescript-eslint/await-thenable': 'error', //await对象必须是thenable类型
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'], //使用readonly fields代替getter返回literal values
        '@typescript-eslint/no-base-to-string': 'error', //仅在能输出有用信息的对象上使用toString方法
        '@typescript-eslint/no-confusing-non-null-assertion': 'error', //禁止在可能造成混淆的位置进行非null断言
        '@typescript-eslint/no-confusing-void-expression': 'error', //禁止使用返回void的表达式赋值
        '@typescript-eslint/no-require-imports': 'error', //禁止使用require引入模块
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn', //禁止不必要的boolean值比较
        '@typescript-eslint/no-unnecessary-condition': 'off', //防止条件始终是真或假的条件
        '@typescript-eslint/no-unnecessary-qualifier': 'warn', //在不需要名称空间限定符的情况下发出警告
        '@typescript-eslint/no-unnecessary-type-constraint': 'error', //禁止对泛型类型进行不必要的约束
        '@typescript-eslint/non-nullable-type-assertion-style': 'warn', //在可能的情况下，优先使用非空断言而不是显式类型强制转换
        '@typescript-eslint/prefer-includes': 'warn', //优先使用includes代替indexOf
        '@typescript-eslint/prefer-reduce-type-parameter': 'error', //调用reduce时传入参数类型
        '@typescript-eslint/prefer-optional-chain': 'error', //优先使用简洁的可选链表达式，而不是链式逻辑与
        '@typescript-eslint/prefer-nullish-coalescing': 'error', //强制使用无效合并运算符，而不是逻辑链接
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn', //优先使用startWith endWith
        '@typescript-eslint/require-array-sort-compare': 'warn', //建议使用sort函数排序
        '@typescript-eslint/strict-boolean-expressions': 'off', //限制布尔表达式中允许的类型
        '@typescript-eslint/type-annotation-spacing': 'warn', //类型前保持有空格
        '@typescript-eslint/ban-ts-comment': 'off', //禁用ts标注
        'brace-style': 'off', //大括号风格
        '@typescript-eslint/brace-style': ['warn', '1tbs', {'allowSingleLine': true}],
        'comma-spacing': 'off', //逗号前后的空格
        '@typescript-eslint/comma-spacing': ['warn', {'before': false, 'after': true}],
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': ['error'], //带默认值的参数必须防置在最后面
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': 'warn', //避免不必要的方括号
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': ['error'], //不允许在函数标识符及其调用之间使用空格
        'indent': 'off',
        '@typescript-eslint/indent': [
            'off',
            4,
            {
                SwitchCase: 1,
            },
        ], //目前缩进检测存在一些极端情况下的问题，暂时禁用，主动使用prettier保持一置
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': ['error'], //禁止使用数组构造器
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': ['error'], //禁止重复定义类成员
        'no-duplicate-imports': 'off',
        '@typescript-eslint/no-duplicate-imports': ['error'], //禁止重复导入
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': ['error', 'functions'], //禁止非必要的括号
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': ['error'], //禁止循环中声明函数
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'], //禁止重复声明变量
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'], //no-shadow
        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': ['error'], //禁止抛出字面量错误 throw "error";
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'], //未定义前不能使用
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['error'], //花括号内间距一致
        'quotes': 'off',
        '@typescript-eslint/quotes': ['warn', 'single'], //引号类型 `` "" ''
        'no-return-await': 'off',
        '@typescript-eslint/return-await': 'error', //强制一致地返回await的值
        'semi': 'off',
        '@typescript-eslint/semi': [
            'warn',
            'always',
            {
                omitLastInOneLineBlock: true,
            },
        ], //语句强制分号结尾
        'space-infix-ops': 'off',
        '@typescript-eslint/space-infix-ops': ['warn', {'int32Hint': false}], //中缀操作符周围要不要有空格
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // ESlint
        'no-alert': 'error', //禁止使用alert confirm prompt
        'no-bitwise': 'error', //禁止使用按位运算符
        'no-caller': 'error', //禁止使用arguments.caller或arguments.callee
        'no-catch-shadow': 'error', //禁止catch子句参数与外部作用域变量同名
        'no-class-assign': 'error', //禁止给类赋值
        'no-cond-assign': 'error', //禁止在条件表达式中使用赋值语句
        'no-console': [
            'warn',
            {
                allow: ['warn', 'error'],
            },
        ], //禁止使用console
        'no-const-assign': 'error', //禁止修改const声明的变量
        'no-constant-condition': 'error', //禁止在条件中使用常量表达式 if(true) if(1)
        'no-continue': 'off', //禁止使用continue
        'no-control-regex': 'error', //禁止在正则表达式中使用控制字符
        'no-debugger': 'warn', //禁止使用debugger
        'no-delete-var': 'error', //不能对var声明的变量使用delete操作符
        'no-div-regex': 'error', //不能使用看起来像除法的正则表达式/=foo/
        'no-dupe-keys': 'error', //在创建对象字面量时不允许键重复 {a:1,a:1}
        'no-dupe-args': 'error', //函数参数不能重复
        'no-duplicate-case': 'error', //switch中的case标签不能重复
        'no-else-return': 'error', //如果if语句里面有return,后面不能跟else语句
        'no-empty': 'off', //块语句中的内容不能为空
        'no-empty-character-class': 'error', //正则表达式中的[]内容不能为空
        'no-empty-label': 'off', //禁止使用空label
        'no-eq-null': 'error', //禁止对null使用==或!=运算符
        'no-eval': 'error', //禁止使用eval
        'no-ex-assign': 'error', //禁止给catch语句中的异常参数赋值
        'no-extend-native': 'error', //禁止扩展native对象
        'no-extra-bind': 'error', //禁止不必要的函数绑定
        'no-extra-boolean-cast': 'error', //禁止不必要的bool转换
        'no-fallthrough': 'error', //禁止switch穿透
        'no-floating-decimal': 'error', //禁止省略浮点数中的0 .5 3.
        'no-func-assign': 'error', //禁止重复的函数声明
        'no-implicit-coercion': 'error', //禁止隐式转换
        'no-implied-eval': 'error', //禁止使用隐式eval
        'no-inline-comments': 'off', //禁止行内备注
        'no-inner-declarations': ['error', 'functions'], //禁止在块语句中使用声明（变量或函数）
        'no-invalid-regexp': 'error', //禁止无效的正则表达式
        'no-invalid-this': 'off', //禁止无效的this，只能用在构造器，类，对象字面量
        'no-irregular-whitespace': 'off', //不能有不规则的空格
        'no-iterator': 'error', //禁止使用 iterator 属性
        'no-label-var': 'error', //label名不能与var声明的变量名相同
        'no-labels': 'error', //禁止标签声明
        'no-lone-blocks': 'error', //禁止不必要的嵌套块
        'no-lonely-if': 'error', //禁止else语句内只有if语句
        'no-mixed-requires': ['error', false], //声明时不能混用声明类型
        'no-mixed-spaces-and-tabs': ['off', false], //禁止混用tab和空格
        'linebreak-style': ['off', 'windows'], //换行风格
        'no-multi-spaces': 'off', //不能用多余的空格
        'no-multi-str': 'error', //字符串不能用\换行
        'no-multiple-empty-lines': [
            'off',
            {
                max: 2,
            },
        ], //空行最多不能超过2行
        'no-native-reassign': 'error', //不能重写native对象
        'no-negated-in-lhs': 'error', //in 操作符的左边不能有!
        'no-nested-ternary': 'error', //禁止使用嵌套的三目运算
        'no-new': 'error', //禁止在使用new构造一个实例后不赋值
        'no-new-func': 'off', //禁止使用new Function
        'no-new-object': 'error', //禁止使用new Object()
        'no-new-require': 'error', //禁止使用new require
        'no-new-wrappers': 'error', //禁止使用new创建包装实例，new String new Boolean new Number
        'no-obj-calls': 'error', //不能调用内置的全局对象，比如Math() JSON()
        'no-octal': 'error', //禁止使用八进制数字
        'no-octal-escape': 'error', //禁止使用八进制转义序列
        'no-param-reassign': 'off', //禁止给参数重新赋值
        'no-path-concat': 'off', //node中不能使用__dirname或__filename做路径拼接
        'no-plusplus': 'off', //禁止使用++，--
        'no-process-env': 'off', //禁止使用process.env
        'no-process-exit': 'off', //禁止使用process.exit()
        'no-proto': 'error', //禁止使用__proto__属性
        'no-regex-spaces': 'error', //禁止在正则表达式字面量中使用多个空格 /foo bar/
        'no-restricted-modules': 'error', //如果禁用了指定模块，使用就会报错
        'no-return-assign': 'error', //return 语句中不能有赋值表达式
        'no-script-url': 'error', //禁止使用javascript:void(0)
        'no-self-compare': 'error', //不能比较自身
        'no-sequences': 'off', //禁止使用逗号运算符
        'no-shadow-restricted-names': 'error', //严格模式中规定的限制标识符不能作为声明时的变量名使用
        'no-spaced-func': 'error', //函数调用时 函数名与()之间不能有空格
        'no-sparse-arrays': 'error', //禁止稀疏数组， [1,,2]
        'no-sync': 'off', //nodejs 禁止同步方法
        'no-ternary': 'off', //禁止使用三目运算符
        'no-trailing-spaces': 'off', //一行结束后面不要有空格
        'no-this-before-super': 'error', //在调用super()之前不能使用this或super
        'no-undef': 'error', //不能有未定义的变量
        'no-undef-init': 'error', //变量初始化时不能直接给它赋值为undefined
        'no-undefined': 'error', //不能使用undefined
        'no-unexpected-multiline': 'error', //避免多行表达式
        'no-underscore-dangle': 'off', //标识符不能以_开头或结尾
        'no-unneeded-ternary': 'error', //禁止不必要的嵌套 var isYes = answer === 1 ? true :false;
        'no-unreachable': 'error', //不能有无法执行的代码
        'no-unused-expressions': 'off', //禁止无用的表达式
        'no-unused-vars': 'off', //不能有声明后未被使用的变量或参数
        'no-useless-call': 'error', //禁止不必要的call和apply
        'no-void': 'error', //禁用void操作符
        'no-var': 'error', //禁用var，用let和const代替
        'no-warning-comments': [
            'off',
            {
                terms: ['todo', 'fixme', 'xxx'],
                location: 'start',
            },
        ], //不能有警告备注
        'no-with': 'error', //禁用with
        'array-bracket-spacing': ['off', 'never'], //是否允许非空数组里面有多余的空格
        'arrow-parens': 'off', //箭头函数用小括号括起来
        'arrow-spacing': 'off', //=>的前/后括号
        'accessor-pairs': 'off', //在对象中使用getter/setter
        'block-scoped-var': 'error', //块语句中使用var
        'callback-return': 'error', //避免多次调用回调什么的
        'camelcase': 'off', //强制驼峰法命名
        'comma-dangle': ['off', 'never'], //对象字面量项尾不能有逗号
        'comma-style': ['off', 'last'], //逗号风格，换行时在行首还是行尾
        'complexity': [0, 11], //循环复杂度
        'computed-property-spacing': ['off', 'never'], //是否允许计算后的键名什么的
        'consistent-return': 'off', //return 后面是否允许省略
        'consistent-this': ['error', 'that'], //this别名
        'constructor-super': 'off', //非派生类不能调用super，派生类必须调用super
        'curly': ['error', 'all'], //必须使用 if(){} 中的{}
        'default-case': 'error', //switch语句最后必须有default
        'dot-location': 'off', //对象访问符的位置，换行的时候在行首还是行尾
        'eol-last': 'off', //文件以单一的换行符结束
        'eqeqeq': 'error', //必须使用全等
        'func-names': 'off', //函数表达式必须有名字
        'func-style': ['off', 'declaration'], //函数风格，规定只能使用函数声明/函数表达式
        'generator-star-spacing': 'off', //生成器函数*的前后空格
        'guard-for-in': 'off', //for in循环要用if语句过滤
        'handle-callback-err': 'off', //nodejs 处理错误
        'id-length': 'off', //变量名长度
        'init-declarations': 'off', //声明时必须赋初值
        'key-spacing': [
            'off',
            {
                beforeColon: false,
                afterColon: true,
            },
        ], //对象字面量中冒号的前后空格
        'lines-around-comment': 'off', //行前/行后备注
        'max-depth': ['off', 4], //嵌套块深度
        'max-len': ['off', 80, 4], //字符串最大长度
        'max-nested-callbacks': ['off', 2], //回调嵌套深度
        'max-params': ['off', 3], //函数最多只能有3个参数
        'max-statements': ['off', 10], //函数内最多有几个声明
        'new-cap': 'off', //函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
        'new-parens': 'error', //new时必须加小括号
        'newline-after-var': 'off', //变量声明后是否需要空一行
        'object-shorthand': 'off', //强制对象字面量缩写语法
        'one-var': 'off', //连续声明
        'operator-assignment': ['off', 'always'], //赋值运算符 += -=什么的
        'operator-linebreak': ['off', 'after'], //换行时运算符在行尾还是行首
        'padded-blocks': 'off', //块语句内行首行尾是否要空行
        'prefer-const': 'warn', //首选const
        'prefer-spread': 'off', //首选展开运算
        'prefer-reflect': 'off', //首选Reflect的方法

        'quote-props': ['off', 'always'], //对象字面量中的属性名是否强制双引号
        'radix': 'error', //parseInt必须指定第二个参数
        'id-match': 'off', //命名检测
        'require-yield': 'error', //生成器函数必须有yield
        'semi-spacing': [
            'off',
            {
                before: false,
                after: true,
            },
        ], //分号前后空格
        'sort-vars': 'off', //变量声明时排序
        'space-after-keywords': ['off', 'always'], //关键字后面是否要空一格
        'space-before-blocks': ['off', 'always'], //不以新行开始的块{前面要不要有空格
        'space-before-function-paren': ['off', 'always'], //函数定义时括号前面要不要有空格
        'space-in-parens': ['off', 'never'], //小括号里面要不要有空格
        'space-return-throw-case': 'off', //return throw case后面要不要加空格
        'space-unary-ops': [
            'off',
            {
                words: true,
                nonwords: false,
            },
        ], //一元运算符的前/后要不要加空格
        'spaced-comment': 'off', //注释风格要不要有空格什么的
        'strict': 'error', //使用严格模式
        'use-isnan': 'error', //禁止比较时使用NaN，只能用isNaN()
        'valid-jsdoc': 'off', //jsdoc规则
        'valid-typeof': 'error', //必须使用合法的typeof的值
        'vars-on-top': 'error', //var必须放在作用域顶部
        'wrap-iife': ['error', 'inside'], //立即执行函数表达式的小括号风格
        'wrap-regex': 'off', //正则表达式字面量用小括号包起来
        'yoda': ['error', 'never'], //禁止尤达条件
    },
};
