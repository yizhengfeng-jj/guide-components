## 新手引导组件

```javascript
import guide from 'guid-components';

// 
useEffect(() => {
    guide.init([
        {
            el: '#test1', // 唯一
            title: 'test1',
            content: '我是测试1',
            placement: 'top'
        },
        {
            el: '#test2', // 唯一
            title: 'test2',
            content: '我是测试2',
            placement: 'left'
        },
        {
            el: '#test3', // 唯一
            title: 'test3',
            content: '我是测试3',
            placement: 'bottom'
        },
        {
            el: '#test4', // 唯一
            title: 'test4',
            content: '我是测试3',
            placement: 'right'
        }
    ]);
}, []);
```
