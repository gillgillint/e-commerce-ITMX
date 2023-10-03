-- Answer #1
select a.AGENT_CODE, a.AGENT_NAME, sum(o.ORD_AMOUNT) as ORDER_AMOUNT from agents a
left join orders o 
on a.AGENT_CODE = o.AGENT_CODE
group by
a.AGENT_CODE, a.AGENT_NAME
order by
ORDER_AMOUNT desc
limit 1;

-- Answer #2
select c.CUST_CODE, c.CUST_NAME, sum(o.ORD_AMOUNT) as TOTAL_AMOUBT from customer c
left join orders o
on c.CUST_CODE = o.CUST_CODE
group by
c.CUST_CODE, c.CUST_NAME
having
sum(o.ORD_AMOUNT) > 5000.00

-- Answer #3
select AGENT_CODE, count(ORD_NUM) as TOTAL_ORDERS_IN_JULY_2008 from orders o
where
YEAR(ORD_DATE) = 2008
and MONTH(ORD_DATE) = 7
group by
o.AGENT_CODE;