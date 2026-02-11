def segments(message):
    limit = 160
    additional = 5
    leni = len(message)
    if leni <= limit:
        return [message]
    values = message.split(" ")
    cur = []
    cur_c = 0
    result = []
    count = 1

    for value in values:
        if cur_c + len(value) > limit - additional:
            seg = " ".join(cur)
            prepend = False
            if seg[-1] not in ".":
                if len(seg) + 1 <= limit - additional:
                    seg += " "
                else:
                    prepend = True
            seg += f'({count}/#9#)'
            result.append(seg)
            count += 1
            cur_c = 0
            cur = []
            if prepend:
                cur_c += 1
                cur.append("")
            
        cur_c += len(value) + 1
        cur.append(value)
    if cur_c > 0:
        seg = " ".join(cur)
        seg += f'({count}/#9#)'
        result.append(seg)
    for i in range(len(result)):
        result[i] = result[i].replace("#9#", str(count))
    return result
