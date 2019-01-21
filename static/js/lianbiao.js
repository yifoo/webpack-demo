var LikedList = function(){

    //链表头
    var head = null 
    // 链表长度
    var length = 0

    // 辅助类：节点
    var Node = function(element){
        this.element = element
        this.next = null
    }

    //链表尾添加元素
    this.append = function(element){
        var node = new Node(element)
        //node={
        //   element : element
        //   next : null
        // }

        if(head == null){
            head = node
        } else {
            var current = head
            while(current.next){
                current = current.next
            }
            // while循环执行完之后 ，current已经是链表最后一项了
            current.next = node
        }
        length ++
    }

    //链表某一个位置添加元素
    this.insert = function(position,element){
        // 越界
        if(position > -1 && position < length){
            var node = new Node(element)
            if(position == 0){
                var current = head
                head = node
                head.next = current
            } else {
                var index = 0
                var current = head
                var previous = null
                while(index < position){
                    previous = current
                    current = current.next
                    index ++
                }
            
                previous.next = node
                node.next = current

            }
            length ++
        }
    }
    // splice(1,10)
    // 没有移除 ？？？ 拿出来用一下
    this.removeAt = function(position){
        if(position > -1 && position < length){
            if(position == 0){
                var current = head
                head = current.next
            } else {
                var current = head
                var previous = null
                var index = 0
                while(index < position){
                    previous = current
                    current = current.next
                    index++
                }
                // 跳出循环的时候 index == position
                previous.next = current.next
            }

            length--
            return current
        }
        return null
    }

    this.indexOf = function(element){
        var current = head
        var index = 0
        while(current){
            if(current.element == element){
                return index
            }
            current = current.next
            index++
        }
        return -1
    }

    //removeAt(position)   删除某个位置的元素
    //indexOf(element)     获取某个元素的位置
    this.remove = function(element){
        // length --
        return this.removeAt(this.indexOf(element))
    }

    this.isEmpty = function(){
        return length == 0
    }
    this.size = function(){
        return length
    }

    this.getHead = function(){
        return head
    }
}
//链表和字符串？？？
var l = new LikedList
l.append(1)
l.append(2)
l.append(3)

l.insert(1,10)