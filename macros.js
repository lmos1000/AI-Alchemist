function toggleTimer() {
    const sheet = Application.ActiveSheet;
    const button = sheet.Shapes.Item("calB"); // 获取按钮对象
    console.log("按钮名称：" + button.Name); // 调试信息

    const isRunning = button.TextFrame2.TextRange.Text === "停止计时"; // 判断当前状态

    // 清除剪贴板内容和取消选中区域
    Application.CutCopyMode = false; // 取消剪切或复制状态
    sheet.Range("A1").Select(); // 选中一个无关的单元格（如 A1）
    console.log("清除剪贴板状态并取消选中区域"); // 调试信息

    if (!isRunning) {
        // 开始计时
        const now = new Date();
        const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; // 格式化日期
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`; // 格式化时间

        // 修改按钮名称和背景颜色
        button.TextFrame2.TextRange.Text = "停止计时";
        button.Fill.ForeColor.RGB = 255; // 红色背景（停止计时状态）
        console.log("修改按钮文本为：停止计时，背景颜色为红色"); // 调试信息

        // 插入空白行（只插入一行）
        sheet.Rows.Item(2).Insert(); // 在第二行插入一行
        console.log("在第二行插入一行"); // 调试信息

        // 填写日期和时间
        sheet.Range("B2").Value2 = dateStr; // B2填写日期
        sheet.Range("C2").Value2 = timeStr; // C2填写时间
    } else {
        // 停止计时
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`; // 格式化时间

        // 填写结束时间
        sheet.Range("D2").Value2 = timeStr; // D2填写结束时间

        // 插入公式计算时间差并格式化为 HH:mm
        sheet.Range("E2").Formula = '=IF(D2>=C2,(D2-C2)*24,(1-C2+D2)*24)';
        console.log("在E2插入公式"); // 调试信息

        // 修改按钮名称和背景颜色
        button.TextFrame2.TextRange.Text = "开始计时";
        button.Fill.ForeColor.RGB = 65280; // 绿色背景（开始计时状态）
        console.log("修改按钮文本为：开始计时，背景颜色为绿色"); // 调试信息
    }
}
